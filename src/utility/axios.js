import axios from 'axios';

// ----------------------------------------------------------------------
const userData = JSON.parse(localStorage.getItem('userData'));
if (userData) {
    const accessToken = userData.accessToken;
    axios.defaults.headers.common = {
        Authorization: `Bearer ${accessToken.replace(/"/g, '')}`
    };
}

const axiosInstance = axios.create({baseURL: process.env.REACT_APP_SERVER_URL})

export default axiosInstance;