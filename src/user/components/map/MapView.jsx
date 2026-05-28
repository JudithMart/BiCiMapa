import { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

import { MdDirectionsBike } from "react-icons/md";
import { GiDutchBike } from "react-icons/gi";
import { useAuth } from "../../../context/AuthContext";
import { placeTypes } from "../../../config/placeTypes";
import { getPlaces, isFavorito } from "../../../services/lugar.service";
import { getRutas } from "../../../services/bicitas.service";

import Card from "./../Card";
import CardBicitas from "./../CardBicitas";

import { useBicitasRoutes } from "./hooks/useBicitasRoutes";

import { drawRoute, isUserOffRoute,drawBicitasRoute, } from "./utils/mapRoutes";
import { calculateRouteInfo } from "./utils/calculateRouteInfo";
import { useMapInitialization } from "./hooks/useMapInitialization";
import { useUserLocation } from "./hooks/useUserLocation.jsx";
import { usePlaceMarkers } from "./hooks/usePlaceMarkers.jsx";
import { useBicitasMarker } from "./hooks/useBicitasMarker.jsx";


function MapView() {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [places, setPlaces] = useState([]);
  const markersRef = useRef([]);
  const userLocationRef = useRef(null);

  const [selectedPlace, setSelectedPlace] = useState(null);
  const userMarkerRef = useRef(null);
  const routeCoordinatesRef = useRef(null);

  const lastRecalcRef = useRef(0);

  const selectedPlaceRef = useRef(null);

  const [showBicitasCard, setShowBicitasCard] = useState(false);
  const [selectedRuta, setSelectedRuta] = useState(null);

  const getIcon = (type) => {
    const Icon = placeTypes[type]?.icon;

    if (!Icon) return <span>📍</span>;

    return <Icon />;
  };

  // Estado para rutas BiCitas
  const [rutas, setRutas] = useState([]);

  const bicitasRutasInfo = useBicitasRoutes({
    showBicitasCard,
    rutas,
    userLocation: userLocationRef.current,
  });

  useEffect(() => {
    const fetchRutas = async () => {
      const { rutas, error } = await getRutas();
      console.log("RUTAS:", rutas);
      if (error) {
        console.error(error);
        return;
      }

      setRutas(rutas);
    };

    fetchRutas();
  }, []);

  //------------

  // Estado para el usuario
  //--------
  const { userAuth, userData } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  // Obtener usuario solo una vez al montar

  useEffect(() => {
    selectedPlaceRef.current = selectedPlace;
  }, [selectedPlace]);
  //------------
  //------------
  // Actualizar isFavorite cuando cambie el usuario o el lugar seleccionado
  useEffect(() => {
    console.log("USER:", userAuth);
    console.log("SELECTED:", selectedPlace);

    const checkFavorite = async () => {
      if (userAuth?.id && selectedPlace?.id) {
        const { favorito } = await isFavorito(userAuth.id, selectedPlace.id);
        setIsFavorite(favorito);
      } else {
        setIsFavorite(false);
      }
    };

    checkFavorite();
  }, [userAuth, selectedPlace]);
  //------------

  //------------
  const handleDrawRoute = async (place) => {
    if (!userLocationRef.current || !mapRef.current) {
      alert("Ubicación no disponible");
      return;
    }

    await drawRoute({
      map: mapRef.current,
      start: userLocationRef.current,
      end: [place.longitud, place.latitud],
      color: place.tipo?.color_hex,
      routeCoordinatesRef,
    });
  };
  //------------
  const handleDrawBicitasRoute = async (ruta) => {
    setSelectedRuta(ruta); // Guardar la ruta seleccionada
    if (!userLocationRef.current || !mapRef.current) {
      alert("Ubicación no disponible");
      return;
    }

    await drawBicitasRoute({
      map: mapRef.current,
      start: userLocationRef.current,
      ruta,
      routeCoordinatesRef,
    });
  };

  //------------
  const [routeInfo, setRouteInfo] = useState({ minutes: null, km: null });

  useEffect(() => {
    const fetchRouteInfo = async () => {
      if (!selectedPlace || !userLocationRef.current) {
        setRouteInfo({
          minutes: null,
          km: null,
        });

        return;
      }

      const info = await calculateRouteInfo(userLocationRef.current, [
        selectedPlace.longitud,
        selectedPlace.latitud,
      ]);

      setRouteInfo(info);
    };

    fetchRouteInfo();
  }, [selectedPlace]);

  const allende = {
    name: "Allende 527",
    lng: -101.19633730177365,
    lat: 19.701918925746046,
  };

  //------------

  useMapInitialization({
    mapRef,
    mapContainerRef,
    center: [allende.lng, allende.lat],
  });

  //------------
  useBicitasMarker({
    mapRef,
    coordinates: [allende.lng, allende.lat],
    onClick: () => setShowBicitasCard(true),
  });
  //------------

  useUserLocation({
    mapRef,
    userLocationRef,
    userMarkerRef,
    routeCoordinatesRef,
    selectedPlaceRef,
    lastRecalcRef,
    handleDrawRoute,
  });
  //------------
  usePlaceMarkers({
    mapRef,
    places,
    markersRef,
    getIcon,
    onSelectPlace: setSelectedPlace,
  });

  //------------

  useEffect(() => {
    const fetchPlaces = async () => {
      const { places, error } = await getPlaces();

      if (error) {
        console.error(error);
        return;
      }

      setPlaces(places);
    };

    fetchPlaces();
  }, []);

  //------------

  return (
    <>
      {/* MAPA */}
      <div ref={mapContainerRef} className="w-full h-[100dvh]" />
      {/* TEXTURA (overlay) */}
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[100]" />

      {/* CARD OVERLAY */}
      {selectedPlace && (
        <>
          {/* Overlay para cerrar la Card al hacer click fuera */}
          <div
            className="fixed inset-0 z-40 "
            onClick={() => setSelectedPlace(null)}
          />
          <div className="fixed bottom-28 left-0 right-0 z-50 flex justify-center px-4 animate-slide-up">
            <div
              className="w-full flex justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Card
                image={
                  selectedPlace.imagen_url || "/Tipos/sinTipo/lugarMorelia.jpg"
                }
                title={selectedPlace.nombre}
                slogan={selectedPlace.slogan}
                description={selectedPlace.descripcion}
                tipo={selectedPlace.tipo || {}}
                es_convenio={selectedPlace.es_convenio}
                direction={selectedPlace.direccion}
                promotion={
                  selectedPlace.promocion?.length
                    ? selectedPlace.promocion[0].descripcion
                    : null
                }
                onClose={() => setSelectedPlace(null)}
                onRouteClick={() => handleDrawRoute(selectedPlace)}
                minutes={routeInfo.minutes}
                km={routeInfo.km}
                es_premium={userData?.es_premium}
                id_usuario={userAuth?.id}
                id_lugar={selectedPlace.id}
                favorite={isFavorite}
                slug={selectedPlace.slug}
              />
            </div>
          </div>
        </>
      )}
      {/* CARD BiCitas */}
{showBicitasCard && (
  <div
    className="fixed inset-0 z-50"
    onClick={() => {
      setShowBicitasCard(false);
      setSelectedRuta(null);
    }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/10" />

    {/* CONTENEDOR */}
    <div
      className="
        absolute inset-x-0 bottom-0
        flex justify-center
        px-3
        pb-28
        pt-4
      "
    >
      <div
        className="w-full max-w-[650px]"
        onClick={(e) => e.stopPropagation()}
      >
        <CardBicitas
          rutas={bicitasRutasInfo.length ? bicitasRutasInfo : rutas}
          onRouteClick={handleDrawBicitasRoute}
          lugares={
            selectedRuta
              ? selectedRuta.ruta_lugar?.map((rl) => rl.lugar) || []
              : []
          }
        />
      </div>
    </div>
  </div>
)}
    </>
  );
}

export default MapView;
