/*
Funciones relacionadas con promociones y lugares con promociones
*/

import { supabase } from "../lib/supabase";

//Lugares con promociones activas
export const getLugaresConPromociones = async () => {
  const { data, error } = await supabase
    .from("promocion")
    .select(
      `
    id,
    lugar (
      id,
      nombre,
      imagen_url,
      es_convenio,
      slug,
      tipo:tipo (
        id,
        nombre,
        color_hex
      )
    )
  `,)
    .eq("activa", true);
  const grouped = {};

  data.forEach((promo) => {
    const lugar = promo.lugar;

    if (!grouped[lugar.id]) {
      grouped[lugar.id] = {
        ...lugar,
        total_promociones: 0,
      };
    }

    grouped[lugar.id].total_promociones++;
  });

  const result = Object.values(grouped);
  return { places: result, error: error };
};

//Promociones de un lugar específico
export const getPromocionesPorLugar = async (slug) => {
  // 1. Obtener lugar por slug
  const { data: lugar, error: errorLugar } = await supabase
    .from("lugar")
    .select("id, nombre, slug, es_convenio")
    .eq("slug", slug)
    .maybeSingle();

  if (errorLugar || !lugar) {
    return { promociones: [], error: errorLugar };
  }

  // 2. Obtener promociones
  const { data, error } = await supabase
    .from("promocion")
    .select(
      `
      id,
      descripcion,
      descuento,
      codigo_qr,
      lugar (
        id,
        nombre,
        imagen_url,
        es_convenio,
        slug,
          tipo:tipo (
      id,
      nombre,
      color_hex
    )
      )
     
    `,
    )
    .eq("id_lugar", lugar.id)
    .eq("activa", true);

  return { promociones: data, error };
};
