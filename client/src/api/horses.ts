import axios from "axios"
import { Horse } from "../pages/Horses/Horses";

let baseURL;

if (process.env.NODE_ENV === "production") {
    baseURL = '/api'
} else {
    baseURL = 'http://localhost:3500/api'
}

const horsesApi = axios.create({
    baseURL: baseURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

export const getHorses = async () => {
    const response = await horsesApi.get("/instructors/horses")
    return response.data.result
}

export const addHorse = async (horse: { [k: string]: FormDataEntryValue }) => {
    await horsesApi.post("/admin/add-horse", horse)
}