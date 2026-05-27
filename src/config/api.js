import axios from "axios"


const API_BASE_URL= "https://demo-deployment-latest-2-uus4.onrender.com"

export const api = axios.create({
    baseURL:API_BASE_URL
})