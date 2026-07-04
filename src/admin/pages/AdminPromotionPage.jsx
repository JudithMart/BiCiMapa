import React, { useEffect, useState } from "react";
import AdminPromotion from "../components/Promotion/AdminPromotion";
import {getAllPromotions } from "../../services/admin_promotion.service";

function AdminPromotionPage() {
  const [promociones, setPromociones] = useState([]);

  useEffect(() => {
    const fetchPromociones = async () => {
      const { data, error } = await getAllPromotions();
      if (error) {
        console.error("Error fetching promotions:", error);
      } else {
        setPromociones(data);
      }
    };

    fetchPromociones();
  }, []);

  return (
    <div>
      <AdminPromotion promociones={promociones} />
    </div>
  );
}

export default AdminPromotionPage;
