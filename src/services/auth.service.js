
/*
Funciones para:
- Registro de usuarios
- Inicio de sesión
- Cierre de sesión
- Obtener usuario actual
*/

import { supabase } from '../lib/supabase';

export const registerUser = async (email, password, nombre, telefono) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nombre,
        telefono
      }
    }
  });
  return { user: data?.user, error };
};

export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password,});
  return { user: data?.user, error };
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  // console.log('Usuario actual:', { data, error });
  return { user: data?.user, error };
};

export const getUsuario = async (id) => {
  const { data, error } = await supabase
    .from("usuario")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
};

//Cambiar redirectTo: "https://tudominio.com/update-password"
export const resetPassword = async (email) => {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/editar-contrasena",
  });
};

// Actualizar contraseña del usuario autenticado
export const updatePassword = async (password) => {
  const { error } = await supabase.auth.updateUser({ password });
  return { error };
};