import React, { useEffect, useState } from "react";
import { getAllRoutes } from "../../services/admin_bicitas.service";
import AdminBicitasRoutes from "../components/BicitasRoute/AdminBicitasRoutes";

function AdminBicitasRoutesPage() {
  const [rutas, setRutas] = useState([]);

  useEffect(() => {
    const fetchRutas = async () => {
      const { data, error } = await getAllRoutes();
      if (error) {
        console.error("Error fetching routes:", error);
      } else {
        setRutas(data);
      }
    };

    fetchRutas();
  }, []);

  return (
    <div>
      <AdminBicitasRoutes rutas={rutas} />
    </div>
  );
}

export default AdminBicitasRoutesPage;
