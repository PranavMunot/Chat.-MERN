import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios'
import Cookies from 'js-cookie';


axios.interceptors.request.use(
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

