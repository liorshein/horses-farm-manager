import axios from "axios"
import { Horse } from "../util/types";

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
    return response.data.result.sort((a: Horse, b: Horse) => (a.horse_id > b.horse_id ? 1 : -1))
}

export const addHorse = async (horse: any) => {
    await horsesApi.post("/admin/add-horse", horse)
}

export const editHorse = async (horse: any) => {
    await horsesApi.put("/admin/edit-horse", horse)
}

export const deleteHorse = async (horseId: string) => {
    let params = new URLSearchParams({ horse_id: horseId })
    await horsesApi.delete(`/admin/delete-horse?${params}`)
}