import AdminDashboard from "../components/Dashboard/AdminDashboard";
import {
  getDashboardStats,
  getChallengeProgress,
  getVisitsByPlace,
} from "../../services/admin.service";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../../user/components/LoadingScreen";

function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [challengeUsers, setChallengeUsers] = useState([]);
  const [visitsByPlace, setVisitsByPlace] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const [dashboard, challenge, places] = await Promise.all([
      getDashboardStats(),
      getChallengeProgress(),
      getVisitsByPlace(),
    ]);

    setStats(dashboard);
    setChallengeUsers(challenge.data);
    setVisitsByPlace(places.data);
  };

  if (!stats) return <LoadingScreen />;
  return (
    <div>
      <AdminDashboard
        stats={stats}
        challengeUsers={challengeUsers}
        visitsByPlace={visitsByPlace}
      />
    </div>
  );
}

export default AdminDashboardPage;
