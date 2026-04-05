import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./components/Profile";
import { useState, useCallback } from 'react';
import { getCurrentUser } from "./services/auth.service";


function App() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-101.195, 19.7045], // Coordenadas de Morelia, Michoacán
      zoom: 17,
    });
    return () => {
      mapRef.current.remove();
    };
  }, []);

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
      <div id="map-container" ref={mapContainerRef} />
      <BrowserRouter>
        <Navbar onPerfilClick={handleShowLogin} isLoggedIn={isLoggedIn} />
        {/* Rutas para profile y otras páginas si es necesario */}
        {/* <Routes>
          <Route path="/profile" element={<Profile />} />
        </Routes> */}
      </BrowserRouter>
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-transparent rounded-xl shadow-lg p-6 min-w-[320px] relative">
            <Login onClose={handleCloseLogin} onShowRegister={handleShowRegister} onAuthSuccess={handleAuthSuccess} />
          </div>
        </div>
      )}
      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-transparent rounded-xl shadow-lg p-6 min-w-[320px] relative">
            <Register onClose={handleCloseRegister} onShowLogin={handleShowLogin} onAuthSuccess={handleAuthSuccess} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
