
import AdminDashboard from '../components/AdminDashboard'
import { getDashboardStats } from "../../services/admin.service";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../../user/components/LoadingScreen";

function AdminDashboardPage() {

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
    <div><AdminDashboard stats={stats} /></div>
  )
}

export default AdminDashboardPage