import { supabase } from "../lib/supabase";

// CRUD NOVEDADES
export const getAllNewFeatures = async () => {
  const { data, error } = await supabase
    .from("novedades_bicitas")
    .select("*")
    .order("created_at", { ascending: false });
  return { data, error };
};

export const updateNewFeature = async (id, values) => {
  const { data, error } = await supabase
    .from("novedades_bicitas")
    .update(values)
    .eq("id", id)
    .select()
    .single();
  return { data, error };
};

export const toggleNewFeature = async (id, activa) => {
  const { data, error } = await supabase
    .from("novedades_bicitas")
    .update({ activa })
    .eq("id", id)
    .select()
    .single();
  return { data, error };
};

export const createNewFeature = async (values) => {
  const { data, error } = await supabase
    .from("novedades_bicitas")
    .insert(values)
    .select()
    .single();
  return { data, error };
};

export const deleteNewFeature = async (id) => {
  const { data, error } = await supabase
    .from("novedades_bicitas")
    .delete()
    .eq("id", id)
    .select()
    .single();
  return { data, error };
};