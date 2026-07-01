// src/services/admin_places.service.js
import { supabase } from "../lib/supabase";

// CRUD RUTAS
export const getAllRoutes = async () => {
  const { data, error } = await supabase
    .from("ruta")
    .select(
      `
    *,
    ruta_lugar(
        orden,
        lugar(*)
    )
`,
    )
    .order("created_at", { ascending: false });
  return { data, error };
};

export const updateRoute = async (id, values) => {
  const { data, error } = await supabase
    .from("ruta")
    .update(values)
    .eq("id", id)
    .select()
    .single();
  return { data, error };
};

export const toggleRoute = async (id, activo) => {
  const { data, error } = await supabase
    .from("ruta")
    .update({ activa: activo })
    .eq("id", id)
    .select()   
    .single();

  return { data, error };
};

export const createRoute = async (values) => {
  const { data, error } = await supabase
    .from("ruta")
    .insert(values)
    .select()
    .single();
  return { data, error };
};

export const deleteRoute = async (id) => {
  const { data, error } = await supabase
    .from("ruta")
    .delete()
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};
export const addPlaceToRoute = async(values)=>{

return await supabase
.from("ruta_lugar")
.insert(values);

}

export const removePlaceFromRoute = async(id)=>{

return await supabase
.from("ruta_lugar")
.delete()
.eq("id",id);

}

export const clearPlacesFromRoute = async (routeId) => {
  return await supabase
    .from("ruta_lugar")
    .delete()
    .eq("ruta_id", routeId);
};

//----
export const getAllPlaces = async () => {
  return await supabase
    .from("lugar")
    .select(
      `
      id,
      nombre,
      slogan,
      imagen_url
    `,
    )
    .eq("activo", true)
    .eq("es_convenio", true)
    .order("nombre");
};
//----

// CRUD RETOS  A VISITAR POR MES
export const getAllChallenges = async () => {
  const { data, error } = await supabase
    .from("reto")
    .select(
      `
    *,
    lugar(*)
`,
    )
    .order("created_at", { ascending: false });

  return { data, error };
};

export const updateChallenge = async (id, values) => {
  const { data, error } = await supabase
    .from("reto")
    .update(values)
    .eq("id", id)
    .select()
    .single();
  return { data, error };
};

export const deleteChallenge = async (id) => {
  const { data, error } = await supabase
    .from("reto")
    .delete()
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

export const createChallenge = async (values) => {
  const { data, error } = await supabase
    .from("reto")
    .insert(values)
    .select()
    .single();
  return { data, error };
};
