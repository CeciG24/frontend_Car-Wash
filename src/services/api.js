const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000').replace(/\/$/, '');

export function apiFetch(path, options = {}) {
  return fetch(API_BASE_URL + '/' + path.replace(/^\//, ''), options);
}

export async function apiRequest(path, options = {}) {
  const response = await apiFetch(path, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'No se pudo completar la solicitud');
  return data;
}

export const getServices = () => apiRequest('/services');
export const createBooking = data => apiRequest('/appointments', {
  method: 'POST',
  body: JSON.stringify(data),
});
