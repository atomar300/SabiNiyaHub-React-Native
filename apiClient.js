import axios from "axios"


export const apiClient = axios.create(
    {
        baseURL : "http://192.168.2.23:8080"
    })