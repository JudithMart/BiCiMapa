// src/services/admin.service.js
import { supabase } from "../lib/supabase";

//DATOS PARA DASHBOARD ADMIN
export const getDashboardStats = async () => {
  const [usuarios, premium, lugares, promociones, visitas] = await Promise.all([
    supabase.from("usuario").select("*", { count: "exact", head: true }),

    supabase
      .from("usuario")
      .select("*", { count: "exact", head: true })
      .eq("es_premium", true),

    supabase.from("lugar").select("*", { count: "exact", head: true }),

    supabase
      .from("promocion")
      .select("*", { count: "exact", head: true })
      .eq("activa", true),

    supabase.from("visita").select("*", { count: "exact", head: true }),
  ]);

  return {
    totalUsuarios: usuarios.count || 0,
    premiumUsuarios: premium.count || 0,
    totalLugares: lugares.count || 0,
    promocionesActivas: promociones.count || 0,
    totalVisitas: visitas.count || 0,
  };
};

export const getChallengeProgress = async () => {
  const { data: reto } = await supabase
    .from("reto_mensual")
    .select("*")
    .eq("activo", true)
    .single();

  const { data: lugares } = await supabase
    .from("reto_lugares")
    .select("id_lugar")
    .eq("id_reto", reto.id);

  const { data: usuarios } = await supabase
    .from("usuario")
    .select("id,nombre,telefono,fecha_inicio_membresia")
    .eq("es_premium", true)
    .eq("rol", "user");

  const { data: visitas } = await supabase
    .from("visita")
    .select("id_usuario,id_lugar,fecha_visita")
    .eq("verificado", true);

  const lugaresReto = lugares.map((l) => l.id_lugar);

  const resultado = usuarios.map((usuario) => {
    const fechaInicio = usuario.fecha_inicio_membresia
      ? new Date(usuario.fecha_inicio_membresia)
      : null;

    const visitasUsuario = visitas.filter((v) => {
      if (v.id_usuario !== usuario.id) return false;

      if (!fechaInicio) return false;

      return new Date(v.fecha_visita) >= fechaInicio;
    });

    const lugaresVisitados = [
      ...new Set(
        visitasUsuario
          .filter((v) => lugaresReto.includes(v.id_lugar))
          .map((v) => v.id_lugar),
      ),
    ];

    return {
      usuario,

      reto_mensual: reto,

      visitas_completadas: lugaresVisitados.length,

      completado: lugaresVisitados.length >= reto.visitas_requeridas,
    };
  });

  return { data: resultado };
};

export const getVisitsByPlace = async () => {
  const { data: lugares } = await supabase
    .from("lugar")
    .select("id,nombre")
    .eq("activo", true)
    .eq("es_convenio", true);

  const { data: visitas } = await supabase
    .from("visita")
    .select("id_lugar")
    .eq("verificado", true);

  const resultado = lugares.map((lugar) => ({
    id: lugar.id,
    nombre: lugar.nombre,
    visitas: visitas.filter((v) => v.id_lugar === lugar.id).length,
  }));

  resultado.sort((a, b) => b.visitas - a.visitas);

  return { data: resultado };
};


// visita a cada lugar.
export const getPlacesVisitedByUser = async (userId) => {
  const { data: visitas, error: visitasError } = await supabase
    .from("visita")
    .select("id_lugar,fecha_visita")
    .eq("id_usuario", userId)
    .eq("verificado", true);
 
  if (visitasError) {
    console.error("Error obteniendo visitas:", visitasError);
    return { data: null, error: visitasError };
  }
 
  if (!visitas || visitas.length === 0) {
    return { data: [], error: null };
  }
 
  const { data: lugares, error: lugaresError } = await supabase
    .from("lugar")
    .select("id,nombre,descripcion,imagen_url")
    .in(
      "id",
      visitas.map((v) => v.id_lugar),
    );
 
  if (lugaresError) {
    console.error("Error obteniendo lugares:", lugaresError);
    return { data: null, error: lugaresError };
  }
 
  const ahora = new Date();
  const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
  const finMes = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 1);
 
  const resultado = lugares.map((lugar) => {
    const visitasLugar = visitas.filter((v) => v.id_lugar === lugar.id);
 
    const visitasMes = visitasLugar.filter((v) => {
      const fecha = new Date(v.fecha_visita);
      return fecha >= inicioMes && fecha < finMes;
    });
 
    return {
      ...lugar,
      visitas_totales: visitasLugar.length,
      visitas_mes: visitasMes.length,
      ultima_visita: visitasLugar.reduce((latest, current) => {
        const currentDate = new Date(current.fecha_visita);
        return !latest || currentDate > latest ? currentDate : latest;
      }, null),
    };
  });
 
  // Ordenar por más visitado primero, útil para el reporte a los lugares con convenio
  resultado.sort((a, b) => b.visitas_totales - a.visitas_totales);
 
  return { data: resultado, error: null };
};
 