import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen flex flex-col items-center justify-center text-center px-6"
      style={{
        backgroundImage: "url('/Fondos/FondoBicis.jpeg')",
      }}
    >
      
      <h1 className="text-5xl font-bold text-primary mt-6">
        Ups...
      </h1>

      <p className="text-texto mt-3 text-lg">
        Esa ruta no existe.
      </p>

      <button
        onClick={() => navigate("/")}
        className="
          mt-6
          bg-primary
          text-white
          px-6
          py-3
          rounded-2xl
          shadow-lg
        "
      >
        Volver al mapa
      </button>
    </div>
  );
}

export default NotFound;