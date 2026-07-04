import AdminDashboard from "../components/Dashboard/AdminDashboard";
import { getDashboardStats,getChallengeProgress  } from "../../services/admin.service";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../../user/components/LoadingScreen";

function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [challengeUsers, setChallengeUsers] = useState([]);

  useEffect(() => {
    loadStats();
    loadChallenge();
  }, []);

  const loadStats = async () => {
    const data = await getDashboardStats();
    setStats(data);
  };
  const loadChallenge = async () => {
    const { data } = await getChallengeProgress();
    setChallengeUsers(data || []);
  };

  if (!stats)
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  return (
    <div>
      <AdminDashboard stats={stats} challengeUsers={challengeUsers} />
    </div>
  );
}

export default AdminDashboardPage;
