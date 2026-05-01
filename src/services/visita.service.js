import { supabase } from '../lib/supabase';
7
// Lugares visitados por el usuario
export const getVisitedLugares = async (userId) => {
  return await supabase
    .from("visita")
    .select(`
      id_lugar,
      fecha_visita,
      lugar (
        id,
        nombre,
        imagen_url
      )
    `)
    .eq("id_usuario", userId)
    .eq("verificado", true);
};