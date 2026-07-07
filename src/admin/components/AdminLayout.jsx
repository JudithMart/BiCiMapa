// admin/layouts/AdminLayout.jsx

import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout() {
  return (
    <div
      className="h-screen overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/Fondos/FondoBicis.jpeg')",
      }}
    >
      <div className="flex h-full overflow-hidden">
        <AdminNavbar />

        <main
          className="  overflow-y-auto
            flex-1
            h-full
            
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
