const PUBLIC_API_URL = 'https://backend-car-wash.onrender.com';
const configuredApiUrl = import.meta.env.VITE_API_URL?.trim() || '';
const localApi = /^https?:\/\/(?:localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])(?:[:/]|$)/i.test(configuredApiUrl);
const apiUrl = import.meta.env.DEV
  ? configuredApiUrl || 'http://127.0.0.1:5000'
  : (!localApi && configuredApiUrl) || PUBLIC_API_URL;
const API_BASE_URL = apiUrl.replace(/\/+$/, '');

export function apiFetch(path, options = {}) {
  return fetch(API_BASE_URL + '/' + path.replace(/^\//, ''), options);
}

export async function apiRequest(path, options = {}) {
  const response = await apiFetch(path, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || 'No se pudo completar la solicitud');
    error.code = data.code;
    error.status = response.status;
    throw error;
  }
  return data;
}

export const getServices = options => apiRequest('/services', options);
export const createBooking = data => apiRequest('/appointments', {
  method: 'POST',
  body: JSON.stringify(data),
});
