// admin/layouts/AdminLayout.jsx

import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout() {
  return (
    <div
      className="h-dvh overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/Fondos/FondoBicis.jpeg')",
      }}
    >
      <div className="flex h-full overflow-hidden  ">
        <AdminNavbar />

        <main
          className="  overflow-y-auto overflow-x-hidden 
            flex-1
            min-w-0
            h-[calc(100vh-4rem)] md:h-full
            p-6  md:p-8
            md:ml-0
            mt-16 md:mt-0 "
        >
          <div className="max-w-[1400px] mx-auto w-full ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
