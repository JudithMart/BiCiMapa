import { supabase } from "../lib/supabase";
7;
// Lugares visitados por el usuario
export const getVisitedLugares = async (userId) => {
  return await supabase
    .from("visita")
    .select(
      `
      id_lugar,
      fecha_visita,
      lugar (
        id,
        nombre,
        imagen_url
      )
    `,
    )
    .eq("id_usuario", userId)
    .eq("verificado", true);
};

// Registrar visita manual (token)
export const validarToken = async ({ token, id_usuario, id_promocion }) => {
  // 1. Buscar token
  const { data: tokenData, error: tokenError } = await supabase
    .from("token_lugar")
    .select("*")
    .eq("token", token)
    .eq("activo", true)
    .single();

  if (tokenError || !tokenData) {
    return {
      success: false,
      message: "Token inválido",
    };
  }

  if (tokenData.id_promocion !== id_promocion) {
    return {
      success: false,
      message: "Este código no corresponde a esta promoción",
    };
  }

  const { data: promocionData, error: promocionError } = await supabase
    .from("promocion")
    .select("id_lugar")
    .eq("id", id_promocion)
    .single();

  if (promocionError || !promocionData) {
    return {
      success: false,
      message: "Promoción inválida",
    };
  }

  if (promocionData.id_lugar !== tokenData.id_lugar) {
    return {
      success: false,
      message: "El QR no pertenece a este lugar",
    };
  }
  // 2. Registrar visita
  const { data: visita, error: visitaError } = await supabase
    .from("visita")
    .insert({
      id_usuario,
      id_lugar: tokenData.id_lugar,
      id_promocion,
      metodo: "qr",
      verificado: true,
      id_token: tokenData.id,
    });

  if (visitaError) {
    return {
      success: false,
      message: "Error al registrar visita",
    };
  }

  // 3. Marcar token usado
  await supabase
    .from("token_lugar")
    .update({
      usado: true,
      usado_por: id_usuario,
      usado_en: new Date(),
    })
    .eq("id", tokenData.id);

  return {
    success: true,
    message: "Visita registrada",
  };
};
