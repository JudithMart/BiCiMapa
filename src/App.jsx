
import "./App.css";

import Navbar from "./user/components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./user/pages/Profile";
import MapView from "./user/components/map/MapView";
import Coupons from "./user/pages/Coupons";
import PromotionsList from "./user/pages/PromotionsList";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import Validation from "./user/pages/Validation";
import Favorites from "./user/pages/Favorites";
import ProtectedRoute from "./user/components/ProtectedRoute";
import NotFound from "./user/pages/NotFound";
import ResetPassword from "./user/pages/ResetPassword";


function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { refreshUser } = useAuth();
   const { loading } = useAuth();

  // Función para actualizar el estado de login tras login/registro
  const handleAuthSuccess = () => {
    refreshUser();
    setShowLogin(false);
    setShowRegister(false);
  };

  // Función para mostrar el modal de login
  const handleShowLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleShowRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };
  const handleCloseLogin = () => setShowLogin(false);
  const handleCloseRegister = () => setShowRegister(false);

   if (loading) {
    return <ProtectedRoute />;
  }


  return (
    <>
      <BrowserRouter>
        <Navbar onPerfilClick={handleShowLogin} />
        <Routes>
          <Route path="/" element={<ProtectedRoute><MapView /></ProtectedRoute>} />
          <Route path="/mapa" element={<ProtectedRoute><MapView /></ProtectedRoute>} />
          <Route path="/perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/favoritos" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          {/* LISTA GENERAL */}
          <Route path="/promociones" element={<ProtectedRoute><PromotionsList /></ProtectedRoute>} />
          {/*  DETALLE POR LUGAR (desde navbar o card) */}
          <Route path="/promociones/:slug" element={<ProtectedRoute><Coupons /></ProtectedRoute>} />
          <Route path="/validacion/:promocionId" element={<ProtectedRoute><Validation /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/editar-contrasena" element={<ProtectedRoute><ResetPassword /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
      {showLogin && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end justify-center">
          <div className="w-full max-w-md bg-transparent rounded-t-3xl  animate-slide-up">
            <Login
              onClose={handleCloseLogin}
              onShowRegister={handleShowRegister}
              onAuthSuccess={handleAuthSuccess}
            />
          </div>
        </div>
      )}
      {showRegister && (
        <div className="fixed  inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-transparent  rounded-xl shadow-lg  min-w-[320px] relative">
            <Register
              onClose={handleCloseRegister}
              onShowLogin={handleShowLogin}
              onAuthSuccess={handleAuthSuccess}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;

