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
    .select("id,nombre,telefono");

  const { data: visitas } = await supabase
    .from("visita")
    .select("id_usuario,id_lugar")
    .eq("verificado", true);

  const lugaresReto = lugares.map((l) => l.id_lugar);

  const resultado = usuarios.map((usuario) => {
    const visitasUsuario = visitas.filter((v) => v.id_usuario === usuario.id);

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
