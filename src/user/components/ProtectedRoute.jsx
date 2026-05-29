import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LuBike } from "react-icons/lu";

function ProtectedRoute({ children }) {
  const { userAuth, loading } = useAuth();

  if (loading) {
    return (
        <div
      className="
        fixed inset-0 z-[9999]
        flex flex-col items-center justify-center
        bg-[#F8F4F1]
        overflow-hidden
      "
    >
      {/* Fondo decorativo */}
      <div className="absolute inset-0 opacity-10 bg-noise" />

      {/* Círculo */}
      <div
        className="
          relative
          w-36 h-36
          rounded-full
          border-4 border-primary/20
          flex items-center justify-center
          backdrop-blur-sm
        "
      >
        {/* Bicicleta */}
        <LuBike
          className="
            text-primary
            animate-bike
            drop-shadow-lg
          "
          size={70}
        />

        {/* Spinner */}
        <div
          className="
            absolute inset-0
            rounded-full
            border-4 border-transparent
            border-t-primary
            animate-spin
          "
        />
      </div>

      {/* Texto */}
      <p className="mt-8 text-texto text-lg font-semibold">
        Preparando tu recorrido...
      </p>

      <p className="text-sm text-gray-500 mt-2">
        Cargando experiencia BiCitas
      </p>
    </div>
    );
  }

//   if (!userAuth) {
//     return <Navigate to="/" replace />;
//   }

  return children;
}

export default ProtectedRoute;