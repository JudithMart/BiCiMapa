import React, { useEffect, useState } from "react";
import ProfileC from "../components/ProfileC";
import { useAuth } from "../context/AuthContext";
import { getUserProgress, getRetoActivo, getRetoLugares } from "../services/reto.service";
import {getVisitedLugares} from "../services/visita.service";
import { getVisitasValidas } from "../services/user_premium.service";

function Profile() {
  const { userAuth, userData } = useAuth();
  const [userProgress, setUserProgress] = useState(null);
  const [retoActivo, setRetoActivo] = useState(null);
  const [lugaresVisitados, setLugaresVisitados] = useState([]);
  const [retoLugares, setRetoLugares] = useState([]);

  const visitasValidas = getVisitasValidas(
  lugaresVisitados,
  userData?.fecha_inicio_membresia
);

  // UseEffect para obtener el reto activo y el progreso del usuario al cargar el componente
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

// UseEffect para obtener el progreso del usuario cada vez que cambia el userAuth

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

// UseEffect para obtener los lugares visitados por el usuario cada vez que cambia el userAuth

  useEffect(() => {
    const fetchVisitedLugares = async () => {
      if (userAuth?.id) {
        const { data, error } = await getVisitedLugares(userAuth?.id);
        console.log("Lugares visitados por el usuario:", data);
        if (error) {
          console.error(error);
          return;
        }
        setLugaresVisitados(data);
      }
    };

    fetchVisitedLugares();
  }, [userAuth?.id]);

  // UseEffect para obtener los lugares del reto activo
  useEffect(() => {
    const fetchRetoLugares = async () => {
      if (retoActivo?.id) {
        const { data, error } = await getRetoLugares(retoActivo?.id);
        console.log("Lugares del reto activo:", data);
        if (error) {
          console.error(error);
          return;
        }
        setRetoLugares(data);
      }
    };

    fetchRetoLugares();
  }, [retoActivo?.id]);

  
  return (
    <>
      <ProfileC
        id_usuario={userAuth?.id}
        nombre={userAuth?.user_metadata?.nombre}
        visitas_completadas={userProgress?.visitas_completadas}
        visitas_restantes={retoActivo?.visitas_requeridas}
        lugares_visitados={visitasValidas}
        lugares_reto={retoLugares}
        fecha_expiracion={userData?.fecha_expiracion}
      />
    </>
  );
}

export default Profile;
