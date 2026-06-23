import React, { useEffect, useState } from "react";
import AdminCard from "./AdminCard";
import { getDashboardStats } from "../../services/admin.service";
import LoadingScreen from "../../user/components/LoadingScreen";7
import { FaUserGroup } from "react-icons/fa6";
import { GrUserNew } from "react-icons/gr";
import { LiaPlaceOfWorshipSolid } from "react-icons/lia";
import { RiDiscountPercentFill } from "react-icons/ri";
import { MdOutlineAutoGraph } from "react-icons/md";


function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

    const loadStats = async () => {
    const data = await getDashboardStats();
    setStats(data);
    console.log("Dashboard stats:", data); // Agrega este console.log para depuración
  };

  if (!stats) return <div><LoadingScreen /></div>;



  return (
    <div className="w-full px-4 md:px-8 py-6">
    

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
        <AdminCard
          icono={<FaUserGroup />}
          descripcion="Total Usuarios"
          datos={stats.totalUsuarios}
        />

        <AdminCard
          icono={<GrUserNew />}
          descripcion="Usuarios Premium"
          datos={stats.premiumUsuarios}
        />

        <AdminCard
          icono={<LiaPlaceOfWorshipSolid />}
          descripcion="Total Lugares"
          datos={stats.totalLugares}
        />

        <AdminCard
          icono={<RiDiscountPercentFill />}
          descripcion="Promociones Activas"
          datos={stats.promocionesActivas}
        />

        {/* Tarjeta larga */}
        <div className="lg:col-span-2">
          <AdminCard
            icono={<MdOutlineAutoGraph />}
            descripcion="Total visitas a lugares"
            datos={stats.totalVisitas}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
