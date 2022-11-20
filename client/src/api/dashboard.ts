import axios from "axios"
import { Salary } from "../util/types";

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
        salaryData.sort(function (a: Salary,b: Salary) {
            const firstDate = new Date(a.mydate).valueOf()
            const secondDate = new Date(b.mydate).valueOf()
            return firstDate - secondDate
        }); 
        return salaryData
    } else {
        salaryData = await (await dashboardApi.get(`/instructors/lessons-per-month`)).data.result.rows
        personalData = await (await dashboardApi.get("/instructors/user")).data.result
        horsesData = await (await dashboardApi.get(`/instructors/favorite-horse`)).data.result.rows
        salaryData.sort(function (a: Salary,b: Salary) {
            const firstDate = new Date(a.mydate).valueOf()
            const secondDate = new Date(b.mydate).valueOf()
            return firstDate - secondDate
        });        
        
        return { salaryData, personalData, horsesData }
    }
}