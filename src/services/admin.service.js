
// src/services/admin.service.js
import { supabase } from "../lib/supabase";



//DATOS PARA DASHBOARD ADMIN
export const getDashboardStats = async () => {
  const [
    usuarios,
    premium,
    lugares,
    promociones,
    visitas,
  ] = await Promise.all([
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

// CRUD USUARIOS 
export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from("usuario")
    .select(`
      id,
      nombre,
      telefono,
      email,
      rol,
      es_premium,
      fecha_expiracion,
      activo,
      created_at
    `)
    .order("created_at", { ascending: false });

  return { data, error };
};

export const updateUser = async (id, values) => {
  const { data, error } = await supabase
    .from("usuario")
    .update(values)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

export const deactivateUser = async (id) => {
  const { data, error } = await supabase
    .from("usuario")
    .update({
      activo: false,
    })
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

export const togglePremium = async (
  userId,
  currentPremium
) => {
  const values = currentPremium
    ? {
        es_premium: false,
        fecha_inicio_membresia: null,
        fecha_expiracion: null,
      }
    : {
        es_premium: true,
        fecha_inicio_membresia: new Date(),
        fecha_expiracion: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ),
      };

  const { data, error } = await supabase
    .from("usuario")
    .update(values)
    .eq("id", userId)
    .select()
    .single();

  return { data, error };
};


// CRUD LUGARES
// CRUD PROMOCIONES
// CRUD BICITAS - RUTAS - NOVEDADES