/*
Funciones para:
- Obtener todos los lugares 
- Obtener un lugar por tipo 
- Obtener un lugar por id
- Crear lugar 
- Actualizar lugar
- Eliminar lugar
*/

import { supabase } from '../lib/supabase';

export const addPlace = async (
    nombre, descripcion, slogan, imagen_url, latitud, longitud, 
    id_tipo, es_convenio, codigo_visita, activo) => {
  const { data, error } = await supabase.from('lugar').insert([
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
      activo
    }
  ]);
  return { place: data, error };
};

export const getPlaces = async () => {
  const { data, error } = await supabase.from('lugar').select('*, tipo(*)');
   console.log('lugares:', { data, error });
  return { places: data, error };
};

export const getPlaceById = async (id) => {
  const { data, error } = await supabase.from('lugar').select('*').eq('id', id);
  return { place: data[0], error };
};

export const updatePlace = async (
    id, nombre, descripcion, slogan, imagen_url, latitud, longitud, 
    id_tipo, es_convenio, codigo_visita, activo) => {
  const { data, error } = await supabase.from('lugar').update({
    nombre,
    descripcion,
    latitud,
    longitud,
    slogan,
    imagen_url,
    id_tipo,
    es_convenio,
    codigo_visita,
    activo

  }).eq('id', id);
  return { place: data, error };
};

export const deletePlace = async (id) => {
  const { data, error } = await supabase.from('lugar').delete().eq('id', id);
  return { place: data, error };
};
    
