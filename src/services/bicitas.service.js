import { supabase } from "../lib/supabase";

// Rutas BICITAS
export const getRutas = async () => {
  return await supabase
    .from("ruta")
    .select(`
      *,
      ruta_lugar (
        orden,
        lugar (
          id,
          nombre,
          imagen_url,
          latitud,
          longitud
        ),
      )
    `)
    .eq("activa", true);
};