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
    try {
        let results = await lessonsApi.post("/admin/addLesson", lesson);
        return results.data.rows[0];
    } catch (error: any) {
        return error.response
    }
};

export const editLesson = async (lesson_id: number, start: any, end: any) => {
    try {
        const data = { lesson_id: lesson_id, start: start, end: end };
        await lessonsApi.put("/admin/edit-lesson", data);
    } catch (error: any) {        
        return error.response;
    }
};

export const deleteLesson = async (lessonId: string) => {
    let params = new URLSearchParams({ lesson_id: lessonId });
    const response = await lessonsApi.delete(`/admin/delete-lesson?${params}`);
    return response;
};
