
import { Home, Heart, Ticket, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";



export default function Navbar({ onPerfilClick }) {
  const { userAuth } = useAuth();
  const isLoggedIn = !!userAuth;
  const tabs = [
    { name: "Explorar", icon: Home, route: "/" },
    { name: "Guardados", icon: Heart, route: "/guardados" },
    { name: "Promociones", icon: Ticket, route: "/promociones" },
    { name: "Perfil", icon: User, route: isLoggedIn ? "/profile" : "/login" },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const active = tabs.findIndex(tab =>
  tab.route !== "/" 
    ? location.pathname.startsWith(tab.route)
    : location.pathname === "/"
);
  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50 ">
      <div className="relative bg-[#AC687D] rounded-2xl px-4  py-3 flex gap-8 shadow-lg min-w-[320px]">
        {/* Floating active circle animada */}
        <div
          className="absolute -top-5 transition-all duration-300"
          style={{
            left: `calc(${(active === -1 ? 0 : active) * 25}% + 12.5%)`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="w-12 h-12 bg-[#B57A86] rounded-full flex items-center justify-center shadow-md">
            {tabs[active] && (
              (() => {
                const ActiveIcon = tabs[active].icon;
                return <ActiveIcon className="text-white w-5 h-5" />;
              })()
            )}
          </div>
        </div>

        {/* Tabs */}
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = index === active;
          const isPerfil = tab.name === "Perfil";
          return (
            <button
              key={index}
              className={`flex flex-col items-center text-xs tracking-widest 
                focus:outline-none transition-colors duration-300 ${isActive ? "text-white" : "text-white"}`}
              onClick={() => isPerfil && !isLoggedIn && onPerfilClick ? onPerfilClick() : navigate(tab.route)}
              type="button"
              style={{ minWidth: 60 }}
            >
              <Icon className={`w-5 h-5 mb-1 transition-colors duration-300 ${isActive ? "text-[#AC687D]" : "text-white"}`} />
              {tab.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}