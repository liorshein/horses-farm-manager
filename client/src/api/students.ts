import axios, { AxiosError } from "axios"
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

export const getInstructors = async () => {
    const roles = await (await axiosPrivate.get("/auth/re-login")).data.roles
    if (roles.includes("Admin")) {
        let instructorsData = await (await axiosPrivate.get("/admin/instructors")).data.result
        return instructorsData
    }
}

export const getStudents = async () => {
    const roles = await (await axiosPrivate.get("/auth/re-login")).data.roles
    let studentsData
    if (roles.includes("Admin")) {
        studentsData = await (await studentsApi.get("/admin/students")).data.result
        for (let student of studentsData) {
            if (student.instructor_id == null) {
                student.instructor_name = "Not Set"
            }
        }
    } else {
        studentsData = await (await studentsApi.get("/instructors/user-students")).data.result
    }

    studentsData.sort((a: Student, b: Student) => (a.student_id > b.student_id ? 1 : -1));

    return { studentsData }
}

export const addStudent = async (student: any) => {
    delete student["instructor_name"]
    if (!Object.values(student).includes("")) {
        try {
            const response = await studentsApi.post("/admin/add-student", student)
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

export const editStudent = async (student: any) => {
    if (!Object.values(student).includes("")) {
        try {
            const response = await studentsApi.put("/admin/edit-student", student)
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

export const deleteStudent = async (studentId: string) => {
    let params = new URLSearchParams({ student_id: studentId })
    try {
        const response = await studentsApi.delete(`/admin/delete-student?${params}`)
        alert(response.data.message)
        return response.status
    } catch (error) {
        if (error instanceof AxiosError) {
            alert(error.response?.data.message)
        }
    }
}