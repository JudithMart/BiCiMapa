//admin_promotion.service.js
import { supabase } from "../lib/supabase";

// CRUD PROMOCIONES

export const getAllPromotions = async () => {
  const { data, error } = await supabase
    .from("promocion")
    .select(
      `*, lugar(*),     
      token_lugar(
        id,
        token,
        activo,
        creado_en,
        expira_en
    )
`,
    )
    .order("created_at", { ascending: false });

  return { data, error };
};

export const updatePromotion = async (id, values) => {
  const { data, error } = await supabase
    .from("promocion")
    .update(values)
    .eq("id", id)
    .select()
    .maybeSingle();
  return { data, error };
};

export const deletePromotion = async (id) => {
  const { data, error } = await supabase
    .from("promocion")
    .delete()
    .eq("id", id)
    .select()
    .maybeSingle();

  return { data, error };
};

export const togglePromotion = async (promotionId, currentPromotion) => {
  const values = currentPromotion
    ? {
        activa: false,
      }
    : {
        activa: true,
      };

  const { data, error } = await supabase
    .from("promocion")
    .update(values)
    .eq("id", promotionId)
    .select()
    .maybeSingle();

  return { data, error };
};

export const createPromotion = async (values) => {
  const { data, error } = await supabase
    .from("promocion")
    .insert(values)
    .select()
    .maybeSingle();
  return { data, error };
};

export const createToken = async (promotion) => {

  const token = crypto.randomUUID().replace(/-/g, "").slice(0, 12);

  console.log({
    id_lugar: promotion.id_lugar,
    id_promocion: promotion.id,
    token,
    expira_en: new Date(Date.now() + 86400000).toISOString(),
    activo: true,
    usado: false,
    metodo: "qr"
  });

  const { data, error } = await supabase
    .from("token_lugar")
    .insert({
      id_lugar: promotion.id_lugar,
      id_promocion: promotion.id,
      token,
      expira_en: new Date(Date.now() + 86400000).toISOString(),
      activo: true,
      usado: false,
      metodo: "qr",
    })
    .select()
    .single();

  console.log("ERROR", error);
  console.log("DATA", data);

  return { data, error };
};
export const getLastToken = async (idPromocion) => {
  const { data, error } = await supabase
    .from("token_lugar")
    .select("*")
    .eq("id_promocion", idPromocion)
    .eq("activo", true)
    .order("creado_en", { ascending: false })
    .limit(1)
    .maybeSingle();
    console.log("DATA", data);

  return { data, error };
};

export const generateNewToken = async(promotion)=>{

    await supabase
        .from("token_lugar")
        .update({
            activo:false
        })
        .eq("id_promocion",promotion.id)
        .eq("activo",true);

    return createToken(promotion);

}

// END CRUD PROMOCIONES

export const getAllPlaces = async () => {
  return await supabase
    .from("lugar")
    .select(`
      id,
      nombre,
      slogan,
      imagen_url
    `)
    .eq("activo", true)
    .eq("es_convenio", true)
    .order("nombre");
};