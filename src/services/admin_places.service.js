// src/services/admin_places.service.js
import { supabase } from "../lib/supabase";

// CRUD LUGARES
export const getAllPlaces = async () => {
  const { data, error } = await supabase
    .from("lugar")
    .select("*, tipo(*), promocion(*)")
    .order("created_at", { ascending: false });

  return { data, error };
};

export const updatePlace = async (id, values) => {
  const { data, error } = await supabase
    .from("lugar")
    .update(values)
    .eq("id", id)
    .select()
    .single();
  return { data, error };
};

export const deletePlace = async (id) => {
  const { data, error } = await supabase
    .from("lugar")
    .delete()
    .eq("id", id)
    .select()
    .single();


  return { data, error };
};

export const toggleConvenio = async (placeId, currentConvenio) => {
  const values = currentConvenio
    ? {
        es_convenio: false,
      }
    : {
        es_convenio: true,
      };

  const { data, error } = await supabase
    .from("lugar")
    .update(values)
    .eq("id", placeId)
    .select()
    .single();

  return { data, error };
};

export const createPlace = async (values) => {
  const { data, error } = await supabase
    .from("lugar")
    .insert(values)
    .select()
    .single();

  return { data, error };
};

export const uploadPlaceImage = async (file) => {
  function normalizeFileName(name) {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // quita acentos
      .replace(/[^a-zA-Z0-9._-]/g, "-"); // reemplaza espacios y caracteres raros
  }

  const fileName = `${Date.now()}-${normalizeFileName(file.name)}`;

  const { error } = await supabase.storage

    .from("Lugares")

    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage

    .from("Lugares")

    .getPublicUrl(fileName);

  return data.publicUrl;
};
