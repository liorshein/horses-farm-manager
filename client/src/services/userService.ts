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

    const horseId = result.data.result.rows[0]
    return horseId
};

const getHorseWorkHours = () => {
    return axios.get(API_URL + "horse-hours");
};

// const getHorseWorkHours = (horseId: string) => {
//     let params = new URLSearchParams({ horse_id:  horseId})
//     let url = `API_URL + "horse-hours"?${params}`
//     return axios.get(url);
// };

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
    getHorseWorkHours,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
    addStudent,
    addLesson,
    getLessons,
    addHorse,
}

export default UserService;