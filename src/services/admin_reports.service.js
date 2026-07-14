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
    .select("id, nombre, telefono, es_premium")
    .eq("es_premium", true)
    .eq("activo", true);
 
  if (error) return { data: null, error };
 
  const results = await Promise.all(
    premiumUsers.map(async (u) => {
      const { count: vecesPremium } = await supabase
        .from("historial_premium")
        .select("*", { count: "exact", head: true })
        .eq("id_usuario", u.id);
 
      const { count: vecesRetoCumplido } = await supabase
        .from("usuario_reto")
        .select("*", { count: "exact", head: true })
        .eq("id_usuario", u.id)
        .eq("completado", true);
 
      return {
        nombre: u.nombre,
        telefono: u.telefono,
        vecesPremium: vecesPremium || 0,
        vecesRetoCumplido: vecesRetoCumplido || 0,
      };
    }),
  );
 
  return { data: results, error: null };
};
 

/**
 * Cuenta cuántas PERSONAS ÚNICAS visitaron cada lugar dentro de un rango
 * de fechas (por defecto, el mes en curso).
 *
 * OJO: esto es distinto al conteo de "visitas totales" que probablemente
 * ya tienes en admin.service.js (getVisitsByPlace) — ese cuenta cada
 * visita, este cuenta personas distintas (si alguien visitó 3 veces el
 * mismo lugar, aquí cuenta 1, no 3).
 */
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
      grouped[key] = { lugar: v.lugar?.nombre || "Sin nombre", usuarios: new Set() };
    }
    grouped[key].usuarios.add(v.id_usuario);
  });
 
  const result = Object.values(grouped)
    .map((g) => ({ lugar: g.lugar, personas: g.usuarios.size }))
    .sort((a, b) => b.personas - a.personas);
 
  return { data: result, error: null };
};