import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, getUsuario } from "../services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(null); 
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true);

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
      setUserData(data);

    } catch (error) {
      console.error("Auth error:", error);
      setUserAuth(null);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userAuth,
        userData,
        setUserAuth,
        setUserData,
        refreshUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);