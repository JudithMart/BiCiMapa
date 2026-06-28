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

  console.log("DELETE DATA:", data);
  console.log("DELETE ERROR:", error);

  return { data, error };
};

export const toggleConvenio = async (
  placeId,
  currentConvenio
) => {
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

export const uploadPlaceImage = async(file)=>{

    const fileName=`${Date.now()}-${file.name}`;

    const {error}=await supabase.storage

        .from("Lugares")

        .upload(fileName,file);

    if(error) throw error;

    const {data}=supabase.storage

        .from("Lugares")

        .getPublicUrl(fileName);

    return data.publicUrl;

}