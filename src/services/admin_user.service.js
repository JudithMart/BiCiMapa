import { supabase } from "../lib/supabase";

// CRUD USUARIOS
export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from("usuario")
    .select(
      `
      id,
      nombre,
      telefono,
      email,
      rol,
      es_premium,
      fecha_expiracion,
      activo,
      created_at
    `,
    )
    .order("created_at", { ascending: false });

  return { data, error };
};

export const updateUser = async (id, values) => {
  const { data, error } = await supabase
    .from("usuario")
    .update(values)
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

export const deactivateUser = async (id) => {
  const { data, error } = await supabase
    .from("usuario")
    .update({
      activo: false,
    })
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

export const togglePremium = async (userId, currentPremium) => {
  const values = currentPremium
    ? {
        es_premium: false,
        fecha_inicio_membresia: null,
        fecha_expiracion: null,
      }
    : {
        es_premium: true,
        fecha_inicio_membresia: new Date(),
        fecha_expiracion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      };

  const { data, error } = await supabase
    .from("usuario")
    .update(values)
    .eq("id", userId)
    .select()
    .single();

  if (!currentPremium) {
    await supabase.from("historial_premium").insert({
      id_usuario: userId,
      fecha_inicio: values.fecha_inicio_membresia,
      fecha_fin: null,
    });
  }

  // Terminó Premium
  if (currentPremium) {
    await supabase
      .from("historial_premium")
      .update({
        fecha_fin: new Date().toISOString(),
      })
      .eq("id_usuario", userId)
      .is("fecha_fin", null);
  }
  return { data, error };
};
