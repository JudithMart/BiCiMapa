import { supabase } from '../lib/supabase';

// Obtener reto activo
export const getRetoActivo = async () => {
  return await supabase
    .from("reto_mensual")
    .select("*")
    .eq("activo", true)
    .maybeSingle()

};

// Lugares del reto
export const getRetoLugares = async () => {
  return await supabase
    .from("reto_lugares")
    .select(`
      id_lugar,
      lugar (
        id,
        nombre,
        imagen_url
      )
    `);
};

