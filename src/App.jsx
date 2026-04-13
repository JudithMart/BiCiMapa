
import "./App.css";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./components/Profile";
import MapView from "./components/MapView";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useState, useCallback } from "react";
import { getCurrentUser } from "./services/auth.service";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Checar si el usuario está logueado al montar la app
  useEffect(() => {
    getCurrentUser().then(({ user }) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  // Función para actualizar el estado de login tras login/registro
  const handleAuthSuccess = useCallback(() => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setShowRegister(false);
  }, []);

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

  return (
    <>
      <BrowserRouter>
        <MapView />
        <Navbar onPerfilClick={handleShowLogin} isLoggedIn={isLoggedIn} />
        {/* Rutas para profile y otras páginas si es necesario */}
        {/* <Routes>
          <Route path="/profile" element={<Profile />} />
        </Routes> */}
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
