// admin/layouts/AdminLayout.jsx

import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/Fondos/FondoBicis.jpeg')",
      }}
    >
      <div className="flex min-h-screen">
        <AdminNavbar />

        <main
          className="
            flex-1
            p-6
            md:ml-0
            mt-16 md:mt-0
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}