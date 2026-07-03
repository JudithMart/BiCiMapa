//admin_challenge.service.js
import { supabase } from "../lib/supabase";

// CRUD RETOS
export const getAllChallenges = async () => {
  const { data, error } = await supabase
    .from("reto_mensual")
    .select(
      `
      *,
      reto_lugares(
        id_lugar,
        lugar(
          id,
          nombre
        )
      )
    `,
    )
    .order("created_at", { ascending: false });

  return { data, error };
};

const saveChallengePlaces = async (idReto, lugares) => {
 
  await supabase.from("reto_lugares").delete().eq("id_reto", idReto);

  if (!lugares?.length) return;

  const rows = lugares.map((id_lugar) => ({
    id_reto: idReto,
    id_lugar,
  }));

  return await supabase.from("reto_lugares").insert(rows);
};

export const updateChallenge = async (id, values, lugares = []) => {
  const { data, error } = await supabase
    .from("reto_mensual")
    .update(values)
    .eq("id", id)
    .select()
    .single();

  if (error) return { data, error };

  await saveChallengePlaces(id, lugares);

  return { data, error };
};

export const deleteChallenge = async (id) => {
  const { data } = await supabase
    .from("reto_mensual")
    .delete()
    .eq("id", id)
    .select()
    .single();

  return { data };
};

export const createChallenge = async (values, lugares = []) => {
  const { data, error } = await supabase
    .from("reto_mensual")
    .insert(values)
    .select()
    .single();

  if (error) return { data, error };

  await saveChallengePlaces(data.id, lugares);

  return { data, error };
};
