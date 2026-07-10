// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, getUsuario } from "../services/auth.service";
import { validatePremiumStatus } from "../services/user_premium.service";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = userData?.rol === "admin";

  const refreshUser = async () => {
    try {
      setLoading(true);

      const { user } = await getCurrentUser();

      if (!user) {
        setUserAuth(null);
        setUserData(null);
        return;
      }

      setUserAuth(user);

      const { data } = await getUsuario(user.id);
      // VALIDAR PREMIUM
      const premiumActivo = await validatePremiumStatus(data);

      // ACTUALIZAR userData
      setUserData({
        ...data,
        es_premium: premiumActivo,
      });
    } catch (error) {
      console.error(error);
      setUserAuth(null);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (
        event === "SIGNED_IN" ||
        event === "TOKEN_REFRESHED" ||
        event === "USER_UPDATED"
      ) {
        await refreshUser();
      }

      if (event === "SIGNED_OUT") {
        setUserAuth(null);
        setUserData(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        userAuth,
        userData,
        setUserAuth,
        setUserData,
        refreshUser,
        isAdmin,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
