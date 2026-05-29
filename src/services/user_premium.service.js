import { supabase } from '../lib/supabase';


/**
 * Verifica si el premium sigue activo.
 * Si expiró, actualiza automáticamente la BD.
 */
export const validatePremiumStatus = async (user) => {
  if (!user?.es_premium) {
    return false;
  }

  if (!user?.fecha_expiracion) {
    return false;
  }

  const expired = new Date(user.fecha_expiracion).getTime() <= Date.now();

  // Si ya expiró:
  if (expired) {
    const { error } = await supabase
      .from("usuario")
      .update({
        es_premium: false,
        fecha_activacion: null,
        fecha_expiracion: null,
      })
      .eq("id", user.id);

    if (error) {
      // console.error("Error actualizando premium:", error);
    }

    return false;
  }

  return true;
};

/**
 * Días restantes
 */
export const getDaysLeft = (fecha_expiracion) => {
  if (!fecha_expiracion) return 0;

  const diff = new Date(fecha_expiracion).getTime() - Date.now();

  return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
};

/**
 * Helper visual
 */
export const isPremiumActive = (es_premium, fecha_expiracion) => {
  if (!es_premium || !fecha_expiracion) {
    return false;
  }

  return new Date(fecha_expiracion).getTime() > Date.now();
};

export const getVisitasValidas = (visitas, fecha_inicio) => {
  if (!fecha_inicio) return [];

  const inicio = new Date(fecha_inicio);

  return visitas.filter((v) => new Date(v.fecha_visita) >= inicio);
};
