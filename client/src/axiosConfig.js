// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:5000',
  baseURL:'https://flighttask.onrender.com',
  timeout: 5000, 
});

export default instance;
