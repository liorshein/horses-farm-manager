import axios from "axios";
import { Student } from "../pages/Students/Students";

axios.defaults.withCredentials = true

//* Put functions

const updateArrived = (lesson_id: string, boolean: string) => {
    let params = new URLSearchParams({ lesson_id: lesson_id, arrived: boolean})
    axios.put(`/api/update-arrived?${params}`)
}

//* Delete functions

const deleteStudent = (student_id: string) => {
    let params = new URLSearchParams({ student_id: student_id })
    axios.delete(`/api/delete-student?${params}`)
}

const deleteHorse = (horse_id: string) => {
    let params = new URLSearchParams({ horse_id: horse_id })
    axios.delete(`/api/delete-horse?${params}`)
}

const deleteLesson = (lesson_id: string) => {
    let params = new URLSearchParams({ lesson_id: lesson_id })
    axios.delete(`/api/delete-lesson?${params}`)
}

//* Post functions

const addHorse = async (name: string, age: number, breed: string, assignable: boolean) => {
    const result = await axios.post("/api/add-horse", {
        name: name,
        age: age,
        breed: breed,
        assignable: assignable
    });

    return result
};

const addStudent = (inputs: Student) => {
    axios.post("/api/add-student", {
        name: inputs.student_name,
        id: inputs.id,
        date_of_birth: inputs.date_of_birth,
        age: inputs.age,
        weight: inputs.weight,
        height: inputs.height,
        hmo: inputs.hmo,
        address: inputs.address,
        framework: inputs.framework,
        working_on: inputs.working_on
    });
};

const addLesson = (horse_id: number, date: string, lesson_time: string, student_id: number) => {
    axios.post("/api/add-lesson", {
        horse_id: horse_id,
        date: date,
        lesson_time: lesson_time,
        student_id: student_id,
    });
};

//* Get functions

const getPersonalInfo = async () => {
    return (await axios.get("/api/user")).data.result
}

const getFavoriteHouse = async () => {
    let result = await axios.get(`/api/favorite-horse`);
    return result
};

const getSalaryPerMonth = async (date: string) => {
    let params = new URLSearchParams({ year_month_str: date })    
    let results = await (await axios.get(`/api/salary?${params}`)).data.result.rows[0].count
    return results
}

const getLessonsPerMonth = async () => {
    let results = await (await axios.get(`/api/lessons-per-month`)).data.result.rows
    return results
}

const getMonthOfLessons = async () => {
    let results = await (await axios.get(`/api/lessons-monthly`)).data.result.rows  
    return results
}

const getAvailableHours = async (horse_id: string, date: string) => {
    let params = new URLSearchParams({ horse_id: horse_id, date: date })
    let availableHours = await axios.get(`/api/lessons-available?${params}`);
    return availableHours
};

const getUserStudentsInfo = async () => {
    return (await axios.get("/api/user-students")).data.result
}

const getHorsesInfo = async () => {
    return (await axios.get("/api/horses")).data.result
}

const getAvailableHorses = async () => {
    return (await axios.get("/api/horses-available")).data.result
}

const getUserLessons = async (date: string) => {
    let params = new URLSearchParams({ date: date })
    return (await axios.get(`/api/lessons?${params}`)).data.result
}

const UserService = {
    addStudent,
    addLesson,
    addHorse,
    getPersonalInfo,
    getFavoriteHouse,
    getSalaryPerMonth,
    getMonthOfLessons,
    getAvailableHours,
    getUserStudentsInfo,
    getHorsesInfo,
    getUserLessons,
    getAvailableHorses,
    getLessonsPerMonth,
    deleteStudent,
    deleteHorse,
    deleteLesson,
    updateArrived
}

export default UserService;