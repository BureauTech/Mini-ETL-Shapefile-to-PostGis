import axios from 'axios';

const api = axios.create({
    baseURL: "https://stormy-crag-55599.herokuapp.com"
});

export default api;