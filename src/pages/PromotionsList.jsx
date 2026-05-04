import React from 'react'
import PromotionsListC from '../components/PromotionsListC'
import { getLugaresConPromociones } from "../services/promotion.service";
import { useState,useEffect } from "react";

function PromotionsList() {

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const { places, error } = await getLugaresConPromociones();

      if (error) {
        console.error(error);
        return;
      }

      setPlaces(places);
    };

    fetchPlaces();
  }, []);

  return (
    <div><PromotionsListC places={places} /></div>
  )
}

export default PromotionsList