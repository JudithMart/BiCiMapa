// AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminRoute({ children }) {

    const { userData, loading } = useAuth();

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!userData) {
        return <Navigate to="/mapa" replace />;
    }

    if (userData.rol !== "admin") {
    return <Navigate to="/mapa" replace />;
}
    return children;
}