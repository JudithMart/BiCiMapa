import React, { useEffect, useState } from "react";
import { getAllNewFeatures } from "../../services/admin_features.service";
import AdminFeatures from "../components/Features/AdminFeatures";

function AdminFeaturesPage() {

  const [novedades, setNovedades] = useState([]);

  useEffect(() => {
    const fetchNovedades = async () => {
      const { data, error } = await getAllNewFeatures();

      if (error) {
        console.error("Error fetching new features:", error);
        return;
      }

      setNovedades(data);
    };

    fetchNovedades();
  }, []);

  return (
    <div>
      <AdminFeatures novedades={novedades} />
    </div>
  );
}

export default AdminFeaturesPage