import axios from "axios"
import { Lesson } from "../util/types";
import { axiosPrivate } from "./axios";

let baseURL;

if (process.env.NODE_ENV === "production") {
    baseURL = '/api'
} else {
    baseURL = 'http://localhost:3500/api'
}

const lessonsApi = axios.create({
    baseURL: baseURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

export const getLessons = async () => {
    const roles = await (await axiosPrivate.get("/auth/re-login")).data.roles
    let lessonsData
    let instructorsData
    if (roles.includes("Admin")) {
        instructorsData = await (await axiosPrivate.get("/admin/instructors")).data.result
    } else {
        lessonsData = await (await lessonsApi.get("/instructors/user-students")).data.result
    }

    lessonsData.sort((a: Lesson, b: Lesson) => (a.lesson_id > b.lesson_id ? 1 : -1));

    return { lessonsData, instructorsData }
}

export const addStudent = async (horse: any) => {
    await lessonsApi.post("/admin/add-student", horse)
}

export const editStudent = async (horse: any) => {
    await lessonsApi.put("/admin/edit-student", horse)
}

export const deleteStudent = async (studentId: string) => {
    let params = new URLSearchParams({ student_id: studentId })
    await lessonsApi.delete(`/admin/delete-student?${params}`)
}