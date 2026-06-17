import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
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

// Response interceptor – clear session on 401 but never force-navigate.
// Route guards (PrivateRoute) handle redirecting to /login when a protected
// route is accessed without auth, so public pages like the landing page are
// never yanked away on reload.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.dispatchEvent(new Event('auth:expired'));
        }
        return Promise.reject(error);
    }
);

export default api;