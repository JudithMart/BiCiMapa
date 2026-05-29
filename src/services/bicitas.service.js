import { supabase } from "../lib/supabase";

// Rutas BICITAS
export const getRutas = async () => {

  const { data, error } = await supabase
    .from("ruta")
    .select(`
      id,
      nombre,
      descripcion,
      ruta_lugar (
        orden,
        lugar (
          id,
          nombre,
          latitud,
          longitud
        )
      )
    `)
    .eq("activa", true);

  // console.log(data);

  return {
    rutas: data,
    error,
  };
};