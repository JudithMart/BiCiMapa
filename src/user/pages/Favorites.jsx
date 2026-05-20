import React, { useEffect, useState } from "react";
import FavoritesC from "../components/FavoritesC";
import { getLugaresFavoritosPorUsuario } from "../../services/lugar.service";

import { useAuth } from "../../context/AuthContext";

function Favorites() {
  const [lugaresFavoritos, setLugaresFavoritos] = useState([]);
  const { userData } = useAuth();

  useEffect(() => {
    const fetchPlaces = async () => {
      const { favoritos, error } = await getLugaresFavoritosPorUsuario(userData.id);

      if (error) {
        console.error(error);
        return;
      }

      setLugaresFavoritos(favoritos);
      console.log(favoritos);
    };

    if (userData?.id) {
      fetchPlaces();
    }
  }, [userData?.id]);

  return (
    <>
      <FavoritesC lugaresFavoritos={lugaresFavoritos}   es_premium={userData?.es_premium}/>
    </>
  );
}

export default Favorites;
