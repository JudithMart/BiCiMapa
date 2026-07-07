/*
Funciones para:
- Obtener todos los lugares 
- Obtener un lugar por tipo 
- Obtener un lugar por id
- Crear lugar 
- Actualizar lugar
- Eliminar lugar
*/

import { supabase } from "../lib/supabase";

export const addPlace = async (
  nombre,
  descripcion,
  slogan,
  imagen_url,
  latitud,
  longitud,
  id_tipo,
  es_convenio,
  codigo_visita,
  activo,
) => {
  const { data, error } = await supabase.from("lugar").insert([
    {
      nombre,
      descripcion,
      latitud,
      longitud,
      slogan,
      imagen_url,
      id_tipo,
      es_convenio,
      codigo_visita,
      activo,
    },
  ]);
  return { place: data, error };
};

export const getPlaces = async () => {
  const { data, error } = await supabase
    .from("lugar")
    .select("*, tipo(*), promocion(*)")
    .eq("visible_mapa", true)
    .eq("activo", true);

  
  return { places: data, error };
};

export const getPlaceById = async (id) => {
  const { data, error } = await supabase.from("lugar").select("*").eq("id", id);
  return { place: data[0], error };
};

export const updatePlace = async (
  id,
  nombre,
  descripcion,
  slogan,
  imagen_url,
  latitud,
  longitud,
  id_tipo,
  es_convenio,
  codigo_visita,
  activo,
) => {
  const { data, error } = await supabase
    .from("lugar")
    .update({
      nombre,
      descripcion,
      latitud,
      longitud,
      slogan,
      imagen_url,
      id_tipo,
      es_convenio,
      codigo_visita,
      activo,
    })
    .eq("id", id);
  return { place: data, error };
};

export const deletePlace = async (id) => {
  const { data, error } = await supabase.from("lugar").delete().eq("id", id);
  return { place: data, error };
};

// Funciones para agregar, quitar favoritos y saber si un lugar es favorito para un usuario

export const addFavorito = async (id_usuario, id_lugar) => {
  return await supabase
    .from("usuario_favorito")
    .upsert([{ id_usuario, id_lugar }], { onConflict: "id_usuario,id_lugar" });
};

export const removeFavorito = async (id_usuario, id_lugar) => {
  return await supabase
    .from("usuario_favorito")
    .delete()
    .eq("id_usuario", id_usuario)
    .eq("id_lugar", id_lugar);
};

export const isFavorito = async (id_usuario, id_lugar) => {
  if (!id_usuario || !id_lugar) {
    return { favorito: false, error: null };
  }
  const { data, error } = await supabase
    .from("usuario_favorito")
    .select("*")
    .eq("id_usuario", id_usuario)
    .eq("id_lugar", id_lugar)
    .maybeSingle();

  if (error) {
  
    return { favorito: false, error };
  }

  return { favorito: !!data, error: null };
};

export const getLugaresFavoritosPorUsuario = async (id_usuario) => {
  const { data, error } = await supabase
    .from("usuario_favorito")
    .select(
      `
      id_lugar,
      lugar (
        id,
        nombre,
        imagen_url,
        slug,
        es_convenio,
        tipo:tipo (
          id,
          nombre,
          color_hex
        ),
        promocion (
          id
        )
      )
    `,
    )
    .eq("id_usuario", id_usuario);
  if (error) {
 
    return { favoritos: [], error };
  }
  // Total de promociones a cada lugar
  const favoritos = data.map((item) => ({
    ...item.lugar,
    total_promociones: item.lugar.promocion ? item.lugar.promocion.length : 0,
  }));
  return { favoritos, error: null };
};
