import axios from 'axios';

const api = axios.create({
    baseURL: "https://stormy-crag-55599.herokuapp.com"
    //baseURL:'http://localhost:8080'
});

export default api;
