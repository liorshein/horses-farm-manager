import { EventResizeDoneArg } from "@fullcalendar/interaction";
import { EventDropArg } from "@fullcalendar/react";
import axios, { AxiosError } from "axios";
import { notifyError, notifySuccess } from "../util/toastFunc";
import { Lesson } from "../util/types";
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

export const getInstructors = async () => {
    const instructors = await (await lessonsApi.get("/admin/instructors")).data.result
    return instructors
}

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
        let results = await lessonsApi.post("/admin/add-lesson", lesson);
        notifySuccess(results.data.message)
        return results.data.result.rows[0];
    } catch (error) {
        if (error instanceof AxiosError) {
            notifyError(error.response?.data.message)
        }
    }
};

export const editLesson = async (lesson_id: number, start: Date, end: Date, horse_id: number, arg: EventResizeDoneArg | EventDropArg) => {
    try {
        const data = {
            lesson_id: lesson_id,
            start_time: start,
            end_time: end,
            horse_id: horse_id
        };

        const response = await lessonsApi.put("/admin/edit-lesson", data);
        notifySuccess(response.data.message)
    } catch (error) {
        if (error instanceof AxiosError) {
            notifyError(error.response?.data.message)
            arg.revert()
        }
    }
};

export const deleteLesson = async (lessonId: string) => {
    let params = new URLSearchParams({ lesson_id: lessonId });
    const response = await lessonsApi.delete(`/admin/delete-lesson?${params}`);
    notifySuccess(response.data.message)
};
