import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,  // ✅ use env variable for API URL
    withCredentials: true,                 // ✅ include cookies in requests
    headers: { 'Content-Type': 'application/json' }
});

// Request interceptor – attach token if exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor – handle 401 without redirecting on login page
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Only redirect if not already on login page
            if (!window.location.pathname.includes('/login')) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;