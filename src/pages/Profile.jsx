import React, { useEffect, useState } from "react";
import ProfileC from "../components/ProfileC";
import { useAuth } from "../context/AuthContext";
import { getUserProgress, getRetoActivo } from "../services/reto.service";

function Profile() {
  const { userAuth, userData } = useAuth();
  const [userProgress, setUserProgress] = useState(null);
  const [retoActivo, setRetoActivo] = useState(null);

  useEffect(() => {
    const fetchRetoActivo = async () => {
      const { data, error } = await getRetoActivo();

      if (error) {
        console.error(error);
        return;
      }

      setRetoActivo(data);
    };

    fetchRetoActivo();
  }, []);

  useEffect(() => {
    const fetchUserProgress = async () => {
      if (userAuth?.id) {
        const { data, error } = await getUserProgress(userAuth?.id);
        console.log("Progreso del usuario:", data);
        if (error) {
          console.error(error);
          return;
        }

        setUserProgress(data); 
      }
    };

    fetchUserProgress();
  }, [userAuth?.id]);

  return (
    <>
      <ProfileC
        id_usuario={userAuth?.id}
        nombre={userAuth?.user_metadata?.nombre}
        visitas_completadas={userProgress?.visitas_completadas}
        visitas_restantes={retoActivo?.visitas_requeridas}
      />
    </>
  );
}

export default Profile;
