// services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const apiRequest = async (endpoint, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });
    
    if (!response.ok) {
        throw new Error('Error en la solicitud');
    }
    
    return response.json();
};

export const getServices = () => apiRequest('/api/services');
export const createBooking = (data) => 
    apiRequest('/api/bookings', {
        method: 'POST',
        body: JSON.stringify(data),
    });