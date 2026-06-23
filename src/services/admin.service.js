import { supabase } from "../lib/supabase";

export const activatePremium = async (userId) => {
  const today = new Date();

  const expiration = new Date();
  expiration.setDate(today.getDate() + 30);

  const { data, error } = await supabase
  .from("usuario")
  .update({
    es_premium: true,
    fecha_inicio_membresia: new Date(),
    fecha_expiracion: new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ),
  })
  .eq("id", userId);

  return { data, error };
};

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
  const { data, error } = await supabase.from("usuario").select("*");
  return { data, error };
}




// CRUD LUGARES
// CRUD PROMOCIONES
// CRUD BICITAS - RUTAS - NOVEDADES