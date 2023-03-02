import axios from "axios";
import Cookies from 'js-cookie';



export const axiosInstance = axios.create({
    // baseURL: 'http://localhost:4000/api/v1'
    baseURL: 'https://chatbackend-74wf.onrender.com/api/v1'
})

axiosInstance.interceptors.request.use(
    config => {
        const getTokenFromCookie = Cookies.get('token')
        if (getTokenFromCookie) {
            config.headers['Authorization'] = `Bearer ${getTokenFromCookie}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);