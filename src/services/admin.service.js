import { supabase } from "../lib/supabase";

export const activatePremium = async (userId) => {
  const today = new Date();

  const expiration = new Date();
  expiration.setDate(today.getDate() + 30);

  const { data, error } = await supabase
  .from("usuario")
  .update({
    es_premium: true,
    fecha_inicio_membresia: new Date(),
    fecha_expiracion: new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ),
  })
  .eq("id", userId);

  return { data, error };
};