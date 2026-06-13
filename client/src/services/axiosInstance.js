import axios from 'axios';

const api = axios.create({
    baseURL: '/api',        // uses the Vite proxy in dev
    withCredentials: true,  // ✅ critical — tells browser to send/receive cookies
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;