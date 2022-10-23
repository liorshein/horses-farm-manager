import axios from "axios"

let baseURL;

if (process.env.NODE_ENV === "production") {
    baseURL = '/api'
} else {
    baseURL = 'http://localhost:3500/api'
}

const dashboardApi = axios.create({
    baseURL: baseURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

export const getData = async () => {
    const roles = await (await dashboardApi.get("/auth/re-login")).data.roles
    let salaryData;
    let personalData
    let horsesData
    if (roles.includes("Admin")) {
        salaryData = await (await dashboardApi.get("/admin/instructors-lessons-per-month")).data.result.rows
        return salaryData
    } else {
        salaryData = await (await dashboardApi.get(`/instructors/lessons-per-month`)).data.result.rows
        personalData = await (await dashboardApi.get("/instructors/user")).data.result
        horsesData = await (await dashboardApi.get(`/instructors/favorite-horse`)).data.result.rows
        return { salaryData, personalData, horsesData }
    }
}

export const addStudent = async (horse: any) => {
    await dashboardApi.post("/admin/add-student", horse)
}

export const editStudent = async (horse: any) => {
    await dashboardApi.put("/admin/edit-student", horse)
}

export const deleteStudent = async (studentId: string) => {
    let params = new URLSearchParams({ student_id: studentId })
    await dashboardApi.delete(`/admin/delete-student?${params}`)
}