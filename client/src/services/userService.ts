import axios from "axios";

axios.defaults.withCredentials = true

const API_URL = "http://localhost:5000/";

const addHorse = async (name: string, age: number, breed: string, assignable: boolean) => {
    const result = await axios.post(API_URL + "add-horse", {
        name: name,
        age: age,
        breed: breed,
        assignable: assignable
    });

    return result
};

const getLessons = () => {
    return axios.get(API_URL + "lessons");
};

const getUserBoard = async () => {
    const personalInfo = (await axios.get(API_URL + "user")).data.result;
    const studentsInfo = (await axios.get(API_URL + "user-students")).data.result
    const horsesInfo = (await axios.get(API_URL + "horses")).data.result
    return { personalInfo, studentsInfo, horsesInfo }
};

const addStudent = (name: string, age: string, weight: string, background_info: string) => {
    axios.post(API_URL + "add-student", {
        name: name,
        age: age,
        weight: weight,
        background_info: background_info
    });
};

const getWorkHours = async (day: Date) => {
    const horseHours = await axios.get(API_URL + "horse-hours");
    const instructorHours = await axios.get(API_URL + "instructor-hours");
    return { horseHours, instructorHours }
}

const addLesson = (range: string[], student: number, horse: number) => {
    axios.put(API_URL + "add-lesson", {
        range: range,
        student_id: student,
        horse_id: horse,
    });
};

const getModeratorBoard = () => {
    return axios.get(API_URL + "mod");
};

const getAdminBoard = () => {
    return axios.get(API_URL + "admin");
};

const UserService = {
    getWorkHours,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
    addStudent,
    addLesson,
    getLessons,
    addHorse,
}

export default UserService;