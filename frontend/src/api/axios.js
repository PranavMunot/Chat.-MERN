import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:4000/api/v1',
})

axiosInstance.interceptors.request.use(
    config => {
        config.withCredentials = true;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);