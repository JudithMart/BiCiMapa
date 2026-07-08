import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LuLayoutDashboard,
  LuUsers,
  LuMapPin,
  LuTicket,
  LuBike,
  LuMenu,
  LuX,
  LuRoute,
  LuFlag,
  LuChartNoAxesColumn,
  LuLogOut,
} from "react-icons/lu";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../services/auth.service";

export default function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { setUserAuth, setUserData } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
    setUserAuth(null);
    setUserData(null);
    setOpen(false);
    navigate("/mapa", { replace: true });
  };

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
  ];

  const bicitasItems = [
    {
      label: "Rutas",
      path: "/bicitas_historicas_manager/bicitas/rutas",
      icon: <LuRoute size={18} />,
    },
    {
      label: "Retos",
      path: "/bicitas_historicas_manager/bicitas/retos",
      icon: <LuFlag size={18} />,
    },
    {
      label: "Novedades",
      path: "/bicitas_historicas_manager/bicitas/novedades",
      icon: <LuChartNoAxesColumn size={18} />,
    },
  ];

  return (
    <>
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

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <nav
        className={`
        bg-colorAdmin_gray text-white shadow-lg flex flex-col py-10 fixed md:relative top-0 left-0  z-50
 h-dvh w-72   rounded-r-[50px] transform transition-transform duration-300

        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0  "}
      `}
      >
        <div className="flex gap-10  px-8  mb-10">
          <div>
            {" "}
            <button
              type="button"
              onClick={handleLogout}
              className="     "
              aria-label="Cerrar sesión"
            >
              <LuLogOut size={22} className="text-primary" />
            </button>
          </div>
          <div className="flex items-center justify-center ">
            <img src="/Logos/logoB4.png" alt="Logo" className="w-28" />
          </div>
        </div>

        <div className="flex flex-col gap-3 px-5 ">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`
                flex items-center gap-4
                px-5 py-4 rounded-full
                transition

                ${active ? "bg-primary shadow-lg md:w-72 " : "hover:bg-white/10"}
              `}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="mt-6">
            <div className="flex items-center gap-3 px-5 text-texto font-extrabold uppercase text-base">
              <LuBike className="text-primary" />
              BiCitas
            </div>

            <div className="mt-3 ml-5 flex flex-col gap-2">
              {bicitasItems.map((item) => {
                const active = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`
                    flex items-center gap-3
                    px-4 py-3
                    rounded-full
                    transition

                    ${active ? "bg-primary" : "hover:bg-white/10"}
                  `}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
