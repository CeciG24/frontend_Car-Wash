const origin = 'https://ls1713-car-detailing.vercel.app';

export const homePhoto = '/images/auto-detallado.webp';

export const sitePages = {
  '/': {
    title: 'Lavado y detallado automotriz | LS 1713 Car Detailing',
    description: 'Lavado profesional, detallado de interiores y exterior y pulido automotriz. Explora los servicios de LS 1713 y agenda a domicilio o en nuestras instalaciones.',
  },
  '/Services': {
    title: 'Servicios de detallado automotriz | LS 1713',
    description: 'Consulta servicios, precios iniciales y duración estimada de lavado, pulido y detallado para tu tipo de vehículo.',
  },
  '/Booking': {
    title: 'Agenda una cita de detallado | LS 1713',
    description: 'Elige tu vehículo, los servicios y la fecha para solicitar una cita de lavado o detallado automotriz con LS 1713.',
  },
  '/Portfolio': {
    title: 'Portafolio de trabajos de detailing | LS 1713',
    description: 'Explora videos de trabajos de lavado, pulido y detallado automotriz realizados por LS 1713.',
  },
  '/Reviews': {
    title: 'Reseñas de clientes | LS 1713 Car Detailing',
    description: 'Lee las experiencias de clientes de LS 1713 con nuestros servicios de lavado y detallado automotriz.',
  },
};

export function pageMetadata(pathname) {
  const normalized = pathname.replace(/\/$/, '').toLowerCase();
  const path = Object.keys(sitePages).find(route => route.replace(/\/$/, '').toLowerCase() === normalized) || '/';
  return { ...sitePages[path], canonical: origin + path, hero: path === '/' ? homePhoto : '' };
}
