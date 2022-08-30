import axios from "axios";

axios.defaults.withCredentials = true

const API_URL = "http://localhost:5000/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

const getUserBoard = async () => {
    const personalInfo = (await axios.get(API_URL + "user")).data.result;
    const studentsInfo = (await axios.get(API_URL + "user-students")).data.result
    return { personalInfo, studentsInfo }
};

const addStudent = (name: string, age: string) => {
    axios.post(API_URL + "add-student", {
        name: name,
        age: age,
    });
};

const getModeratorBoard = () => {
    return axios.get(API_URL + "mod");
};

const getAdminBoard = () => {
    return axios.get(API_URL + "admin");
};

const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
    addStudent,
}

export default UserService;