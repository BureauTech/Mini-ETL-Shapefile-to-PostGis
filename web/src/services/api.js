import axios from 'axios';

const api = axios.create({
    baseURL: 'https://polar-lake-92685.herokuapp.com/'
});

export default api;