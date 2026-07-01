import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import { Search } from "lucide-react";
import { MdDirectionsBike } from "react-icons/md";
import { GiDutchBike } from "react-icons/gi";
import { useAuth } from "../../../context/AuthContext";
import { placeTypes } from "../../../config/placeTypes";
import { getPlaces, isFavorito } from "../../../services/lugar.service";
import {
  getRutas,
  getActiveRuta,
  getUserRuta,
  createRuta,
  advanceRoute,
  finishRuta,
} from "../../../services/bicitas.service";
import { getNovedadActiva } from "../../../services/new_features.service";

import Card from "./../Card";
import CardBicitas from "./../CardBicitas";

import { useBicitasRoutes } from "./hooks/useBicitasRoutes";

import {
  drawRoute,
  drawSingleBicitasRoute,
  clearRoutes,
} from "./utils/mapRoutes";

import { calculateRouteInfo } from "./utils/calculateRouteInfo";
import { useMapInitialization } from "./hooks/useMapInitialization";
import { useUserLocation } from "./hooks/useUserLocation.jsx";
import { usePlaceMarkers } from "./hooks/usePlaceMarkers.jsx";
import { useBicitasMarker } from "./hooks/useBicitasMarker.jsx";

import { MdOutlineDirections } from "react-icons/md";
import LoadingScreen from "../LoadingScreen.jsx";
import ModalFeatures from "../ModalFeatures.jsx";

import { useMemo } from "react";
import centroMorelia from "../../../assets/geojson/centroMorelia";

const allende = {
  name: "Allende 527",
  lng: -101.19633730177365,
  lat: 19.701918925746046,
};

function MapView() {
  const location = useLocation();
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [places, setPlaces] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const bicitasProgressRef = useRef(null);
  const [llegaste, setLlegaste] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState(null);

  const lastClosestIndexRef = useRef(0);

  const bikeIconRef = useRef(null);

  const [bicitasRouteInfo, setBicitasRouteInfo] = useState({
    minutes: null,
    km: null,
  });

  const tipos = [
    {
      id: null,
      label: "Todos",
      icon: placeTypes[7].icon,
      color: "#B57A86",
    },

    ...Object.entries(placeTypes)
      .filter(([id]) => Number(id) !== 8)
      .map(([id, data]) => {
        const ejemplo = places.find((p) => p.id_tipo === Number(id));

        return {
          id: Number(id),
          label: data.label,
          icon: data.icon,

          color: ejemplo?.tipo?.color_hex || "#B57A86",
        };
      }),
  ];

  const visiblePlaces = useMemo(() => {
  return places.filter(place => {
    if (!place) return false;

    const searchOk = (
      place.nombre ||
      place.tipo?.label ||
      ""
    )
      .toLowerCase()
      .includes(search.toLowerCase());

    const typeOk =
      selectedType === null ||
      place.id_tipo === selectedType;

    return searchOk && typeOk;
  });
}, [places, search, selectedType]);

  const markersRef = useRef([]);
  const userLocationRef = useRef(null);

  const [selectedPlace, setSelectedPlace] = useState(null);
  const userMarkerRef = useRef(null);
  const routeCoordinatesRef = useRef(null);

  const lastRecalcRef = useRef(0);

  const selectedPlaceRef = useRef(null);

  const [showBicitasCard, setShowBicitasCard] = useState(false);
  const [selectedRuta, setSelectedRuta] = useState(null);

  const [mapReady, setMapReady] = useState(false);
  const [locationReady, setLocationReady] = useState(false);

  const getIcon = (type) => {
    const Icon = placeTypes[type]?.icon;

    if (!Icon) return <span>📍</span>;

    return <Icon />;
  };

  // Estado para rutas BiCitas
  const [rutas, setRutas] = useState([]);
  const [bicitasProgress, setBicitasProgress] = useState(null);
  // const rutasCompletadas = await getRutasCompletadas();
  // const completadas = rutasCompletadas.filter(r=>r.completada).length;

  useEffect(() => {
    bicitasProgressRef.current = bicitasProgress;
  }, [bicitasProgress]);

  const bicitasRutasInfo = useBicitasRoutes({
    showBicitasCard,
    rutas,
    userLocation,
  });

  useEffect(() => {
    const fetchRutas = async () => {
      const { rutas, error } = await getRutas();
    
      if (error) {
        console.error(error);
        return;
      }

      setRutas(rutas);
    };

    fetchRutas();
  }, []);

  const [activeRuta, setActiveRuta] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const active = await getActiveRuta();

      if (active.ruta) {
        setActiveRuta(active.ruta);
        const rutaActiva = active.ruta;
        const ruta = rutaActiva.ruta;
        const puntoActual = rutaActiva.punto_actual ?? 1;
        const lugarActual =
          ruta?.ruta_lugar?.find((item) => item.orden === puntoActual)?.lugar ||
          null;

        setBicitasProgress({
          usuarioRutaId: rutaActiva.id,
          ruta,
          puntoActual,
          lugarActual,
        });
      } else {
        setActiveRuta(null);
        setBicitasProgress(null);
        setLlegaste(false);
        const all = await getRutas();
        setRutas(all.rutas || []);
      }
    };

    fetchData();
  }, []);

  const rutasMostrar = activeRuta
    ? [activeRuta.ruta]
    : bicitasRutasInfo.length
      ? bicitasRutasInfo
      : rutas;

  useEffect(() => {
    const fetchBicitasInfo = async () => {
      if (
        !bicitasProgress ||
        !userLocationRef.current ||
        !bicitasProgress.lugarActual
      ) {
        setBicitasRouteInfo({
          minutes: null,
          km: null,
        });

        return;
      }

      const info = await calculateRouteInfo(userLocationRef.current, [
        bicitasProgress.lugarActual.longitud,
        bicitasProgress.lugarActual.latitud,
      ]);

      setBicitasRouteInfo(info);
    };

    fetchBicitasInfo();
  }, [bicitasProgress, userLocation]);
  //------------

  // Estado para el usuario
  //--------
  const { userData } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  // Obtener usuario solo una vez al montar

  useEffect(() => {
    selectedPlaceRef.current = selectedPlace;
  }, [selectedPlace]);
  //------------
  //------------
  // Actualizar isFavorite cuando cambie el usuario o el lugar seleccionado
  useEffect(() => {
   

    const checkFavorite = async () => {
      if (userData?.id && selectedPlace?.id) {
        const { favorito } = await isFavorito(userData.id, selectedPlace.id);
        setIsFavorite(favorito);
      } else {
        setIsFavorite(false);
      }
    };

    checkFavorite();
  }, [userData?.id, selectedPlace?.id]);
  //------------

  const routeColorRef = useRef("#B57A86");
  //------------
  const handleDrawRoute = async (place) => {
    if (!userLocationRef.current || !mapRef.current) {
      alert("Ubicación no disponible");
      return;
    }

    setSelectedPlace(null);
    // cerrar modal de novedades si está abierto
    setShowNovedad(false);
    routeColorRef.current = place.tipo?.color_hex || "#B57A86";

    await drawRoute({
      map: mapRef.current,
      start: userLocationRef.current,
      end: [place.longitud, place.latitud],
      color: place.tipo?.color_hex,
      routeCoordinatesRef,
    });
  };
  //------------
  const handleGoToAllende = async () => {
    setShowBicitasCard(false);

    await handleDrawRoute({
      nombre: "Allende 527",
      longitud: allende.lng,
      latitud: allende.lat,
      tipo: { color_hex: "#B57A86" },
    });
  };
  //------------

  const handleDrawBicitasRoute = async (ruta) => {
    setShowBicitasCard(false);
    setLlegaste(false);

    let progreso = await getUserRuta(ruta.id);

    if (!progreso.data) {
      const creada = await createRuta(ruta.id);

      if (!creada.data) {
        console.log(creada.error);
        return;
      }

      progreso = {
        data: creada.data,
      };
    }

    const progresoData = progreso.data;
    const rutaOrdenada = [...ruta.ruta_lugar].sort((a, b) => a.orden - b.orden);
    const lugarActual = rutaOrdenada[progresoData.punto_actual - 1];

    setBicitasProgress({
      usuarioRutaId: progresoData.id,

      ruta,

      puntoActual: progresoData.punto_actual,

      lugarActual: lugarActual.lugar,
    });

    lastClosestIndexRef.current=0;

    await drawSingleBicitasRoute({
      map: mapRef.current,
      start: userLocationRef.current,
      lugar: lugarActual.lugar,
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

  //------------

  useMapInitialization({
    mapRef,
    mapContainerRef,
    center: [allende.lng, allende.lat],
    setMapReady,
  });
  //------------
  //CENTRO DE MORELIA
  useEffect(() => {
  if (!mapRef.current) return;

  const map = mapRef.current;

  const addCentro = () => {
    if (map.getSource("centro-morelia")) return;

    map.addSource("centro-morelia", {
      type: "geojson",
      data: centroMorelia,
    });

    // relleno
    map.addLayer({
      id: "centro-morelia-fill",
      type: "fill",
      source: "centro-morelia",
      paint: {
        "fill-color": "#FCEAEA",
        "fill-opacity": 0.40,
      },
    });

    // borde
    map.addLayer({
      id: "centro-morelia-outline",
      type: "line",
      source: "centro-morelia",
      paint: {
        "line-color": "#FCEAEA",
        "line-width": 1,
      },
    });
  };

  if (map.isStyleLoaded()) {
    addCentro();
  } else {
    map.once("load", addCentro);
  }
}, [mapReady]);
  //------------
  useBicitasMarker({
    mapRef,
    coordinates: [allende.lng, allende.lat],
    onClick: () => setShowBicitasCard(true),
  });

  // Si la URL tiene ?goto=allende, centrar y mostrar la card
  // Detectar query param y activar estado
  // Detectar query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get("goto") === "allende") {
      const timeoutId = window.setTimeout(() => {
        setShowBicitasCard(true);

        if (mapRef.current) {
          mapRef.current.flyTo({
            center: [allende.lng, allende.lat],
            zoom: 17,
            speed: 1.2,
          });
        }
      }, 500);

      return () => window.clearTimeout(timeoutId);
    }
  }, [location.search]);
  //------------

  useUserLocation({
    mapRef,
    userLocationRef,
    setUserLocation,
    bicitasProgressRef,
    setLlegaste,
    userMarkerRef,
    routeCoordinatesRef,
    routeColorRef,
    selectedPlaceRef,
    lastRecalcRef,
    handleDrawRoute,
    setLocationReady,
    locationReady,
    mapReady,
    setBicitasProgress,
    advanceRoute,
    finishRuta,
    lastClosestIndexRef,
    bikeIconRef,
  });
  //------------
  usePlaceMarkers({
    mapRef,
    places: visiblePlaces,
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
  //Buscador
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const slug = params.get("place");

    if (!slug || places.length === 0) return;

    const place = places.find((p) => p.slug === slug);

    if (!place) return;

    const timeoutId = window.setTimeout(() => {
      setSelectedPlace(place);

      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [place.longitud, place.latitud],
          zoom: 17,
          speed: 1.2,
        });
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [places, location.search]);

  //------------
  //Novedades BiCitas activas
  const [novedades, setNovedades] = useState(null);
  const [showNovedad, setShowNovedad] = useState(false);

  useEffect(() => {
    const fetchNovedad = async () => {
      const { data } = await getNovedadActiva();

      if (data) {
        setNovedades(data);

        setShowNovedad(true);
      }
    };

    fetchNovedad();
  }, []);


  return (
    <>
      {/* BUSCADOR */}

      <div className="fixed top-10 left-4 right-4 z-50 flex justify-center">
        <div className="w-full max-w-xl">
          <div className=" flex items-center bg-white/95 backdrop-blur-md rounded-full px-5 py-3 shadow-xl">
            <Search className="w-5 h-5 text-gray-400 ml-2" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Explora Morelia..."
              className=" ml-3 flex-1 outline-none bg-transparent"
            />
            <button
              onClick={() =>
                handleDrawRoute({
                  nombre: "Allende 527",
                  longitud: allende.lng,
                  latitud: allende.lat,
                  tipo: { color_hex: "#B57A86" },
                })
              }
              className="ml-3 inline-flex items-center gap-2 rounded-full bg-[#B57A86] px-4 py-2 text-white font-semibold shadow-md shadow-[#B57A86]/25 transition-transform hover:-translate-y-0.5"
            >
              <MdOutlineDirections className="h-3 w-3" />
              <p className="text-xs md:text-sm font-normal">BiCitas</p>
            </button>
          </div>
        </div>
      </div>

      {/* RESULTADOS DE BÚSQUEDA */}
      {search.length > 0 && (
        <div className=" fixed top-28 left-4 right-4 z-50 flex justify-center">
          <div className=" w-full max-w-xl bg-white rounded-3xl shadow-xl overflow-hidden border border-white/70">
            {visiblePlaces
              .slice(0, 6)

              .map((place) => {
                const Icon = placeTypes[place.id_tipo]?.icon || Search;
                const placeColor = place.tipo?.color_hex || "#B57A86";

                return (
                  <div
                    key={place.id}
                    onClick={() => {
                      setSelectedPlace(place);

                      mapRef.current.flyTo({
                        center: [place.longitud, place.latitud],

                        zoom: 17,
                      });

                      setSearch("");
                    }}
                    className="flex gap-3 items-center px-4 py-3 cursor-pointer transition-colors"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.95)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0"
                      style={{ backgroundColor: placeColor }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-texto truncate">
                        {place.nombre}
                      </p>

                      <p
                        className="text-xs truncate"
                        style={{ color: placeColor }}
                      >
                        {placeTypes[place.id_tipo]?.label}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {/* TIPOS DE LUGARES */}
      <div className=" fixed top-28  z-40 overflow-x-auto scrollbar-hide left-4 right-4 md:items-center flex md:justify-center">
        <div className="flex gap-2 w-max  ">
          {tipos.map((tipo) => {
            const Icon = tipo.icon;

            return (
              <button
                key={tipo.id}
                onClick={() => {
                  setSelectedType(selectedType === tipo.id ? null : tipo.id);
                  clearRoutes(mapRef.current);
                  routeCoordinatesRef.current = null;
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-full "
                style={{
                  backgroundColor:
                    selectedType === tipo.id
                      ? tipo.color
                      : "rgba(255,255,255,.95)",
                  color: selectedType === tipo.id ? "#fff" : "#555",
                  border: `1px solid ${tipo.color}30`,
                }}
              >
                <Icon />

                <span className="text-xs font-medium">{tipo.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAPA */}

      <div ref={mapContainerRef} className="w-full h-[100dvh]" />
      {!mapReady && <LoadingScreen />}
      {/* {(!mapReady || !locationReady) && (
        <LoadingScreen status={mapReady ? locationStatus : "waiting"} />
      )} */}

   

      {/*Modal Features */}
      {showNovedad && novedades && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          onClick={() => setShowNovedad(false)}
        >
          <div
            className="w-full max-w-[650px]"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalFeatures
              novedades={novedades}
              onRouteClickDirection={handleGoToAllende}
            />
          </div>
        </div>
      )}

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
                id_usuario={userData?.id}
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
                rutas={rutasMostrar}
                onRouteClick={handleDrawBicitasRoute}
                onRouteClickDirection={handleGoToAllende}
                bicitasProgress={bicitasProgress}
                llegaste={llegaste}
                lugares={
                  selectedRuta
                    ? selectedRuta.ruta_lugar?.map((rl) => rl.lugar) || []
                    : []
                }
                minutes={bicitasRouteInfo.minutes}
                km={bicitasRouteInfo.km}
                userData={userData}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MapView;
