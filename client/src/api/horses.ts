import axios, { AxiosError } from "axios"
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
    if (!Object.values(horse).includes("")) {
        try {
            const response = await horsesApi.post("/admin/add-horse", horse)
            alert(response.data.message)
            return response.status
        } catch (error) {
            if (error instanceof AxiosError) {
                alert(error.response?.data.message)
            }
        }
    } else {
        alert("Please provide valid information!")
    }
}

export const editHorse = async (horse: any) => {
    if (!Object.values(horse).includes("")) {
        try {
            const response = await horsesApi.put("/admin/edit-horse", horse)
            alert(response.data.message)
            return response.status
        } catch (error) {
            if (error instanceof AxiosError) {
                alert(error.response?.data.message)
            }
        }
    }
}

export const deleteHorse = async (horseId: string) => {
    let params = new URLSearchParams({ horse_id: horseId })
    try {
        const response = await horsesApi.delete(`/admin/delete-horse?${params}`)
        alert(response.data.message)
        return response.status
    } catch (error) {
        if (error instanceof AxiosError) {
            alert(error.response?.data.message)
        }
    }
}