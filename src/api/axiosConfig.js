import axios from "axios";

export default axios.create({
    // baseURL: 'http://192.168.56.1:8080',
    baseURL: 'https://moviemania-api.onrender.com',
    headers: {
        "ngrok-skip-browser-warning" : "any"
    }
})