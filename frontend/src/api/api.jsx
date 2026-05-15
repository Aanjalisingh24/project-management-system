import axios from "axios";

const API = axios.create({
    baseURL : "https://project-management-system-1-1cbw.onrender.com/api"
});

API.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");

if(token){
    // config.headers.Authorization = token;
    config.headers.Authorization = `Bearer ${token}`;
};
return config;
});


export default API;



