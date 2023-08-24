import axios from 'axios';

const axiosInstance = axios.create({baseURL: process.env.REACT_APP_SERVER_URL})

axiosInstance.interceptors.request.use(
    function (config) {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            const accessToken = userData.accessToken;
            config.headers.Authorization = `Bearer ${accessToken.replace(/"/g, '')}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosInstance;