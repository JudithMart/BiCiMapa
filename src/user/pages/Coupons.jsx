import React, { useEffect, useState } from "react";
import CouponsC from "../components/CouponsC";
import { useParams } from "react-router-dom";
import { getPromocionesPorLugar } from "../../services/promotion.service";

function Coupons() {
  const [promociones, setPromociones] = useState([]);
  const { slug } = useParams();

 useEffect(() => {
  const fetchPlaces = async () => {
    const { promociones, error } = await getPromocionesPorLugar(slug);

    if (error) {
      console.error(error);
      return;
    }

    setPromociones(promociones);
  };

  if (slug) fetchPlaces();
}, [slug]);

  return (
    <>
      <CouponsC  promociones={promociones} />
    </>
  );
}

export default Coupons;
