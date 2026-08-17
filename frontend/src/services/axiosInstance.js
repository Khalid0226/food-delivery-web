import axios from 'axios';

// 1. Base URL set kar lo apne backend ka
const API = axios.create({
    // baseURL: 'http://localhost:2500/api', // Apne backend ka URL yahan daalna
    baseURL: 'https://food-delivery-web-wsx1.onrender.com/api',
});

// 2. Interceptor: Yeh har API request jaane se pehle chalega
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Login ke waqt jo token save kiya tha

    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Automatic header me lag jayega
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default API;