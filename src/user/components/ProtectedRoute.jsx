import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import LoadingScreen from "./LoadingScreen";

function ProtectedRoute({ children }) {
  const { userAuth, loading } = useAuth();

  if (loading) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }

  //   if (!userAuth) {
  //     return <Navigate to="/" replace />;
  //   }

  return children;
}

export default ProtectedRoute;
