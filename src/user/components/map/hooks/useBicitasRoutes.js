import { useEffect, useState } from "react";
import { calculateRouteInfo } from "../utils/calculateRouteInfo";

export const useBicitasRoutes = ({
  showBicitasCard,
  rutas,
  userLocation,
}) => {
  const [bicitasRutasInfo, setBicitasRutasInfo] = useState([]);

  useEffect(() => {
    const calcularInfoRutas = async () => {
      if (!showBicitasCard || !userLocation || !rutas.length) {
        setBicitasRutasInfo([]);
        return;
      }

      const promesas = rutas.map(async (ruta) => {
        if (!ruta.longitud || !ruta.latitud) {
          return {
            ...ruta,
            minutos: null,
            km: null,
          };
        }

        const info = await calculateRouteInfo(userLocation, [
          ruta.longitud,
          ruta.latitud,
        ]);

        return {
          ...ruta,
          minutos: info.minutes,
          km: info.km,
        };
      });

      const rutasConInfo = await Promise.all(promesas);

      setBicitasRutasInfo(rutasConInfo);
    };

    calcularInfoRutas();
  }, [showBicitasCard, rutas, userLocation]);

  return bicitasRutasInfo;
};