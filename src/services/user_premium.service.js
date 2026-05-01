export const isPremiumActive = (es_premium, fecha_expiracion) => {
  if (!es_premium || !fecha_expiracion) return false;

  return new Date(fecha_expiracion) > new Date();
};

export const getDaysLeft = (fecha_expiracion) => {
  if (!fecha_expiracion) return 0;

  const diff =
    new Date(fecha_expiracion).getTime() - new Date().getTime();

  return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
};

export const getVisitasValidas = (visitas, fecha_inicio) => {
  if (!fecha_inicio) return [];

  const inicio = new Date(fecha_inicio);

  return visitas.filter(
    (v) => new Date(v.fecha_visita) >= inicio
  );
};