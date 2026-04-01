import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'


function App() {

 const mapRef = useRef()
 const mapContainerRef = useRef()


   useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-101.195, 19.7045], // Coordenadas de Morelia, Michoacán
      zoom: 17
    });
       return () => {
      mapRef.current.remove()
    }
  }, [])


  return (
    <>
    <div id='map-container' ref={mapContainerRef}/>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
