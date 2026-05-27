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

        // ordenar lugares
        const lugaresOrdenados = [...ruta.ruta_lugar].sort(
          (a, b) => a.orden - b.orden
        );

        // primer punto
        const primerLugar = lugaresOrdenados[0]?.lugar;

        if (!primerLugar) {
          return {
            ...ruta,
            minutos: null,
            km: null,
          };
        }

        const info = await calculateRouteInfo(
          userLocation,
          [primerLugar.longitud, primerLugar.latitud]
        );

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