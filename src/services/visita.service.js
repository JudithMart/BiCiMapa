import { supabase } from "../lib/supabase";

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

  // 2. Validar que el token pertenezca EXACTAMENTE a la promoción que se
  // está canjeando (no solo al mismo lugar).
  if (tokenData.id_promocion !== id_promocion) {
    return {
      success: false,
      message: "Este código no corresponde a esta promoción",
    };
  }

  // 3. Validar que la promoción y el lugar sigan activos.
  // Antes esto no se checaba: si desactivabas una promoción o un lugar,
  // un token viejo seguía canjeándose sin problema.
  const { data: promocionData, error: promocionError } = await supabase
    .from("promocion")
    .select("id_lugar, activa, lugar(activo)")
    .eq("id", id_promocion)
    .single();

  if (promocionError || !promocionData) {
    return {
      success: false,
      message: "Promoción inválida",
    };
  }

  if (!promocionData.activa) {
    return {
      success: false,
      message: "Esta promoción ya no está disponible",
    };
  }

  if (!promocionData.lugar?.activo) {
    return {
      success: false,
      message: "Este lugar ya no está disponible",
    };
  }

  if (promocionData.id_lugar !== tokenData.id_lugar) {
    return {
      success: false,
      message: "El QR no pertenece a este lugar",
    };
  }


  const veinticuatroHorasAtras = new Date(
    Date.now() - 24 * 60 * 60 * 1000,
  ).toISOString();
 
  const { data: visitaReciente, error: cooldownError } = await supabase
    .from("visita")
    .select("id")
    .eq("id_usuario", id_usuario)
    .eq("id_lugar", tokenData.id_lugar)
    .eq("verificado", true)
    .gte("fecha_visita", veinticuatroHorasAtras)
    .limit(1)
    .maybeSingle();
 
  if (cooldownError) {
    return {
      success: false,
      message: "Error al validar la visita",
    };
  }
 
  if (visitaReciente) {
    return {
      success: false,
      message:
        "Ya registraste una visita a este lugar en las últimas 24 horas. Intenta de nuevo más tarde.",
    };
  }
 

  // 4. Registrar visita
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

  // 5. Marcar token usado
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