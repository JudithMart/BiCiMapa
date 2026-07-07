import { useEffect, useRef, useState } from "react";
import { useMapInitialization } from "../../../user/components/map/hooks/useMapInitialization";
import { useDraggableMarker } from "./hooks/useDraggableMarker";

function AdminLocationMap({ form, setForm }) {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  const markerPosition =
    form.latitud !== "" && form.longitud !== ""
      ? [Number(form.longitud), Number(form.latitud)]
      : null;

  useMapInitialization({
    mapRef,
    mapContainerRef,
    center: markerPosition || [-101.1908, 19.7008],
    setMapReady,
  });

  useDraggableMarker({
    mapRef,
    mapReady,
    markerPosition,
    mode: "picker",
    onLocationSelect: (lng, lat) => {
      setForm((prev) => ({
        ...prev,
        longitud: lng,
        latitud: lat,
      }));
    },
  });

  useEffect(() => {
    if (!mapReady || !mapRef.current || !markerPosition) return;

    mapRef.current.flyTo({
      center: markerPosition,
      zoom: 16,
      duration: 500,
    });
  }, [mapReady, markerPosition]);

  return (
    <div className="mt-5 w-full flex flex-col justify-start pl-6 px-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-texto font-semibold text-base md:text-lg lg:text-xl">
          Selección en mapa
        </p>

        <p className="text-xs text-gray-500">
          Haz clic o arrastra el marcador para ubicar el lugar.
        </p>
      </div>

      <div
        ref={mapContainerRef}
        className="mt-3 h-[280px] w-full overflow-hidden rounded-2xl border border-colorAdmin_gray shadow-sm"
      />

      {form.latitud && form.longitud && (
        <div className="mt-3 rounded-lg bg-green-50 p-3 text-sm">
          <p>
            <strong>Latitud:</strong> {form.latitud}
          </p>

          <p>
            <strong>Longitud:</strong> {form.longitud}
          </p>
        </div>
      )}
    </div>
  );
}

export default AdminLocationMap;

