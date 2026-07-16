import AdminDashboard from "../components/Dashboard/AdminDashboard";
import {
  getDashboardStats,
  getChallengeProgress,
  getVisitsByPlace,
} from "../../services/admin.service";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../../user/components/LoadingScreen";

import {
  getVisitsByPlaceMonthly,
  getPremiumUsersReport,
} from "../../services/admin_reports.service";

import { generateGeneralMonthlyReportPDF } from "../utils/Generategeneralmonthlyreportpdf";

function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [challengeUsers, setChallengeUsers] = useState([]);
  const [visitsByPlace, setVisitsByPlace] = useState([]);
  const [downloadingReport, setDownloadingReport] = useState(false);

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

  const handleDownloadMonthlyReport = async () => {
    setDownloadingReport(true);

    const [{ data: visitsMonthly }, { data: premiumReport }] =
      await Promise.all([getVisitsByPlaceMonthly(), getPremiumUsersReport()]);

    generateGeneralMonthlyReportPDF({
      visitsByPlace: visitsMonthly || [],
      premiumUsersReport: premiumReport || [],
    });

    setDownloadingReport(false);
  };

  if (!stats) return <LoadingScreen />;
  return (
    <div>
      <AdminDashboard
        stats={stats}
        challengeUsers={challengeUsers}
        visitsByPlace={visitsByPlace}
        onDownloadMonthlyReport={handleDownloadMonthlyReport}
        downloadingReport={downloadingReport}
      />
    </div>
  );
}

export default AdminDashboardPage;
