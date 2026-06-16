// services/bicitas.service.js
import { supabase } from "../lib/supabase";

// Rutas BICITAS
export const getRutas = async () => {
  const { data, error } = await supabase
    .from("ruta")
    .select(
      `
      id,
      nombre,
      descripcion,
      tiempo_estimado,
      distancia_km,

      ruta_lugar(
        orden,
        lugar(
          id,
          nombre,
          latitud,
          longitud
        )
      )
    `,
    )
    .eq("activa", true);

  // console.log(data);

  return {
    rutas: data,
    error,
  };
};

//Verificar si existe ruta
export const getUserRuta = async (id_ruta) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("usuario_ruta_bicitas")
    .select("*")
    .eq("id_usuario", user.id)
    .eq("id_ruta", id_ruta)
    .eq("completada", false)
    .eq("activo", true)
    .order("fecha_inicio", {
      ascending: false,
    })
    .limit(1);

  return {
    data: data?.[0] || null,
    error,
  };
};

//Crear Ruta
export const createRuta = async (id_ruta) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("usuario_ruta_bicitas")
    .insert({
      id_usuario: user.id,
      id_ruta,
      punto_actual: 1,
    })
    .select()
    .maybeSingle();

  return { data, error };
};

//  Iniciar ruta
export const startRuta = async (id_ruta) => {
  const { data, error } = await supabase
    .from("usuario_ruta_bicitas")
    .select("*")

    .eq("id_ruta", id_ruta)
    .eq("punto_actual", 1)
    .eq("id_usuario", supabase.auth.user().id)
    .eq("activa", true)
    .eq("completada", false)
    .maybeSingle();
  return {
    ruta: data,
    error,
  };
};

// Obtener ruta activa
export const getActiveRuta = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("usuario_ruta_bicitas")
    .select(
      `
      id,
      punto_actual,
      completada,
      fecha_inicio,

      ruta:id_ruta(
        id,
        nombre,
        descripcion,
        tiempo_estimado,
        distancia_km,

        ruta_lugar(
          orden,
          lugar(
            id,
            nombre,
            latitud,
            longitud
          )
        )
      )

    `,
    )
    .eq("id_usuario", user.id)
    .eq("completada", false)
    .eq("activo", true)
    .maybeSingle();

  return { ruta: data, error };
};

// terminar ruta activa
// export const finishRuta = async (id_usuario_ruta) => {

//   const { data, error } = await supabase
//     .from("usuario_ruta_bicitas_lugar")
//     .update({ fecha_fin: new Date().toISOString(), completada: true, activo:false })
//     .eq("id", id_usuario_ruta)
//     .eq("id_usuario", supabase.auth.user().id)
//     .eq("completada", false)
//     .single();
//   return {
//     ruta: data,
//     error,
//   };
// };

//avanzar ruta
export const advanceRoute = async (idUsuarioRuta, siguientePunto) => {
  const { data, error } = await supabase
    .from("usuario_ruta_bicitas")
    .update({
      punto_actual: siguientePunto,
    })
    .eq("id", idUsuarioRuta)
    .select()
    .single();

  return { data, error };
};

// Lugar visitado
export const visitPlace = async (idUsuarioRuta, idLugar) => {
  return await supabase
    .from("usuario_ruta_bicitas_lugar")
    .update({
      visitado: true,
      fecha_visita: new Date(),
    })
    .eq("id_usuario_ruta_bicitas", idUsuarioRuta)
    .eq("id_lugar", idLugar);
};

export const finishRuta = async (idUsuarioRuta) => {
  const { data, error } = await supabase
    .from("usuario_ruta_bicitas")
    .update({
      completada: true,
      activo: false,
      fecha_fin:new Date().toISOString(),
    })
    .eq("id", idUsuarioRuta)
    .select()
    .single();

  return { data, error };
};
