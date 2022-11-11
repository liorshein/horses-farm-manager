import axios from "axios";
import { Lesson } from "../pages/Lessons/Schedule";
let baseURL;

if (process.env.NODE_ENV === "production") {
    baseURL = "/api";
} else {
    baseURL = "http://localhost:3500/api";
}

const lessonsApi = axios.create({
    baseURL: baseURL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

export const getLessons = async (start: any, end: any, instructor: any) => {
    let params = new URLSearchParams({
        start: start,
        end: end,
        instructor: instructor,
    });
    const response = await lessonsApi.get(`/instructors/lessons?${params}`);    
    return response.data;
};

export const addLesson = async (lesson: Lesson) => {
    await lessonsApi.post("/admin/addLesson", lesson);
};

export const editHorse = async (horse: any) => {
    await lessonsApi.put("/admin/edit-horse", horse);
};

export const deleteHorse = async (horseId: string) => {
    let params = new URLSearchParams({ horse_id: horseId });
    await lessonsApi.delete(`/admin/delete-horse?${params}`);
};
