import portfolio from '../data/portfolio.json';

// Preserve JSON order; drafts and incomplete entries stay out of the UI.
export function getPortfolioItems(data = portfolio) {
  if (!Array.isArray(data?.videos)) return [];
  const ids = new Set();
  return data.videos.filter(item => {
    if (!item || item.publicado !== true) return false;
    if (!['id', 'carro', 'servicio', 'url'].every(key => typeof item[key] === 'string' && item[key].trim())) return false;
    if (ids.has(item.id)) return false;
    ids.add(item.id);
    return true;
  });
}

