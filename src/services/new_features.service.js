import { supabase } from "../lib/supabase";

export const getNovedadActiva = async () => {
  const hoy = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase

    .from("novedades_bicitas")

    .select("*")

    .eq("activa", true)

    .lte("fecha_inicio", hoy)

    .gte("fecha_fin", hoy)

    .order("fecha_inicio", { ascending: false })

    .limit(1)

    .maybeSingle();

  return {
    data,
    error,
  };
};
