/**
 * Cuántas veces un usuario ha activado premium.
 * Requiere la tabla historial_premium.
 */

import { supabase } from "../lib/supabase";
export const getPremiumHistoryCount = async (userId) => {
  const { count, error } = await supabase
    .from("historial_premium")
    .select("*", { count: "exact", head: true })
    .eq("id_usuario", userId);

  return { count: count || 0, error };
};

/**
 * Historial de participación de un usuario en retos mensuales
 * (útil si quieres mostrar el detalle mes a mes, no solo el conteo).
 */
export const getUserChallengeHistory = async (userId) => {
  const { data, error } = await supabase
    .from("usuario_reto")
    .select(
      `
      id,
      completado,
      fecha_completado,
      visitas_completadas,
      reto_mensual (
        nombre,
        fecha_inicio,
        fecha_fin,
        visitas_requeridas
      )
    `,
    )
    .eq("id_usuario", userId)
    .order("fecha_completado", { ascending: false });

  return { data, error };
};

/**
 * Reporte de usuarios premium para el PDF mensual:
 * nombre, teléfono, veces que ha sido premium, veces que cumplió el reto.
 */
export const getPremiumUsersReport = async () => {
  const { data: premiumUsers, error } = await supabase
    .from("usuario")
    .select("id, nombre, telefono")
    .eq("activo", true);

  // Obtener todos los retos
  const { data: retos } = await supabase.from("reto_mensual").select("*");

  // Obtener todos los lugares de todos los retos
  const { data: retosLugares } = await supabase
    .from("reto_lugares")
    .select("*");

  // Obtener todas las visitas verificadas
  const { data: visitas } = await supabase
    .from("visita")
    .select("id_usuario,id_lugar,fecha_visita")
    .eq("verificado", true);
  if (error) return { data: null, error };

  const results = await Promise.all(
    premiumUsers.map(async (u) => {
      const { count: vecesPremium } = await supabase
        .from("historial_premium")
        .select("*", { count: "exact", head: true })
        .eq("id_usuario", u.id);

      if (!vecesPremium) return null;

      // Contar retos completados
      let retosCompletados = 0;

      retos.forEach((reto) => {
        const lugaresReto = retosLugares
          .filter((r) => r.id_reto === reto.id)
          .map((r) => r.id_lugar);

        const visitasUsuario = visitas.filter(
          (v) =>
            v.id_usuario === u.id &&
            new Date(v.fecha_visita) >= new Date(reto.fecha_inicio) &&
            new Date(v.fecha_visita) <= new Date(reto.fecha_fin),
        );

        const lugaresVisitados = [
          ...new Set(
            visitasUsuario
              .filter((v) => lugaresReto.includes(v.id_lugar))
              .map((v) => v.id_lugar),
          ),
        ];

        if (lugaresVisitados.length >= reto.visitas_requeridas) {
          retosCompletados++;
        }
      });

      return {
        nombre: u.nombre,
        telefono: u.telefono,
        vecesPremium: vecesPremium || 0,
        vecesRetoCumplido: retosCompletados,
      };
    }),
  );

  return { data: results.filter(Boolean), error: null };
};

export const getVisitsByPlaceMonthly = async (startDate, endDate) => {
  const inicio =
    startDate || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const fin =
    endDate || new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

  const { data, error } = await supabase
    .from("visita")
    .select("id_lugar, id_usuario, lugar(nombre)")
    .gte("fecha_visita", inicio.toISOString())
    .lte("fecha_visita", fin.toISOString());

  if (error) return { data: null, error };

  const grouped = {};
  data.forEach((v) => {
    const key = v.id_lugar;
    if (!grouped[key]) {
      grouped[key] = {
        lugar: v.lugar?.nombre || "Sin nombre",
        usuarios: new Set(),
      };
    }
    grouped[key].usuarios.add(v.id_usuario);
  });

  const result = Object.values(grouped)
    .map((g) => ({ lugar: g.lugar, personas: g.usuarios.size }))
    .sort((a, b) => b.personas - a.personas);

  return { data: result, error: null };
};
