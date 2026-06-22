import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LuLayoutDashboard,
  LuUsers,
  LuMapPin,
  LuTicket,
  LuBike,
  LuMenu,
  LuX,
} from "react-icons/lu";

export default function AdminNavbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      label: "Dashboard",
      path: "/bicitas_historicas_manager",
      icon: <LuLayoutDashboard size={20} />,
    },
    {
      label: "Usuarios",
      path: "/bicitas_historicas_manager/usuarios",
      icon: <LuUsers size={20} />,
    },
    {
      label: "Lugares",
      path: "/bicitas_historicas_manager/lugares",
      icon: <LuMapPin size={20} />,
    },
    {
      label: "Promociones",
      path: "/bicitas_historicas_manager/promociones",
      icon: <LuTicket size={20} />,
    },
    {
      label: "Bicitas",
      path: "/bicitas_historicas_manager/bicitas",
      icon: <LuBike size={20} />,
    },
  ];

  return (
    <>
      {/* BOTÓN HAMBURGUESA SOLO EN CELULAR */}
      <button
        onClick={() => setOpen(!open)}
        className="
          md:hidden
          fixed
          top-4
          left-4
          z-50
          bg-primary
          text-white
          p-3
          rounded-full
          shadow-lg
        "
      >
        {open ? <LuX size={24} /> : <LuMenu size={24} />}
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <nav
        className={`
          bg-[#AFB2B7]
          text-white
          shadow-lg
          flex
          flex-col
          items-center
          py-10

          fixed md:relative
          top-0 left-0
          z-50

          h-screen
          w-72

          rounded-r-[50px]

          transform transition-transform duration-300

          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <img
          src="/Logos/logoB4.png"
          alt="Logo Bicitas"
          className="w-28 mb-12"
        />

        <div className="flex flex-col gap-4 w-full px-5">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-4
                  px-5 py-4
                  rounded-full
                  transition-all duration-200
                  ${active ? "bg-primary shadow-lg w-72" : "hover:bg-white/10"}
                `}
              >
                {item.icon}

                <span className="text-lg font-light">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
