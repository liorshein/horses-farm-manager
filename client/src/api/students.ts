import axios from "axios"
import { Student } from "../util/types";
import { axiosPrivate } from "./axios";

let baseURL;

if (process.env.NODE_ENV === "production") {
    baseURL = '/api'
} else {
    baseURL = 'http://localhost:3500/api'
}

const studentsApi = axios.create({
    baseURL: baseURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

export const getStudents = async () => {
    const roles = await (await axiosPrivate.get("/auth/re-login")).data.roles
    let studentsData
    let instructorsData
    if (roles.includes("Admin")) {
        studentsData = await (await studentsApi.get("/admin/students")).data.result
        instructorsData = await (await axiosPrivate.get("/admin/instructors")).data.result
        for (let student of studentsData) {
            if (student.instructor_id == null) {
                student.instructor_name = "Not Set"
            }
        }
    } else {
        studentsData = await (await studentsApi.get("/instructors/user-students")).data.result
    }

    studentsData.sort((a: Student, b: Student) => (a.student_id > b.student_id ? 1 : -1));

    return { studentsData, instructorsData }
}

export const addStudent = async (horse: any) => {
    await studentsApi.post("/admin/add-student", horse)
}

export const editStudent = async (horse: any) => {
    await studentsApi.put("/admin/edit-student", horse)
}

export const deleteStudent = async (studentId: string) => {
    let params = new URLSearchParams({ student_id: studentId })
    await studentsApi.delete(`/admin/delete-student?${params}`)
}