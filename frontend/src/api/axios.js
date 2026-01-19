import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api/v1'
    // baseURL: 'https://chatbackend-74wf.onrender.com/api/v1'
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