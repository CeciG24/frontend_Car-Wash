export function serviceDurationLabel(minutes) {
  if (!Number.isInteger(minutes) || minutes <= 0) return 'Duración por confirmar';
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  const duration = [hours && hours + ' h', remainder && remainder + ' min'].filter(Boolean).join(' ');
  return 'Duración estimada · ' + duration;
}

export function serviceCategoryLabel({ categoria, tipo }) {
  const packageLabel = tipo === 'Basico' ? 'Básico' : tipo;
  if (categoria === 'Lavado' && packageLabel) return categoria + ' · ' + packageLabel;
  return categoria || packageLabel || 'Servicio';
}
