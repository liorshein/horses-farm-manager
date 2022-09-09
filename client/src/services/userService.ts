import axios from "axios";
import { Student } from "../pages/Students/Students";

axios.defaults.withCredentials = true

const API_URL = "http://localhost:5000/";

//* Delete functions

const deleteStudent = (student_id: string) => {
    let params = new URLSearchParams({ student_id: student_id })
    axios.delete(API_URL + `delete-student?${params}`)
}

const deleteHorse = (horse_id: string) => {
    let params = new URLSearchParams({ horse_id: horse_id })
    axios.delete(API_URL + `delete-horse?${params}`)
}

const deleteLesson = (lesson_id: string) => {
    let params = new URLSearchParams({ lesson_id: lesson_id })
    axios.delete(API_URL + `delete-lesson?${params}`)
}

//* Post functions

const addHorse = async (name: string, age: number, breed: string, assignable: boolean) => {
    const result = await axios.post(API_URL + "add-horse", {
        name: name,
        age: age,
        breed: breed,
        assignable: assignable
    });

    return result
};

const addStudent = (inputs: Student) => {
    axios.post(API_URL + "add-student", {
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
    axios.post(API_URL + "add-lesson", {
        horse_id: horse_id,
        date: date,
        lesson_time: lesson_time,
        student_id: student_id,
    });
};

//* Get functions

const getPersonalInfo = async () => {
    return (await axios.get(API_URL + "user")).data.result
}

const getAvailableHours = async (horse_id: string, date: string) => {
    let params = new URLSearchParams({ horse_id: horse_id, date: date })
    let availableHours = await axios.get(API_URL + `lessons-available?${params}`);
    return availableHours
};

const getUserStudentsInfo = async () => {
    return (await axios.get(API_URL + "user-students")).data.result
}

const getHorsesInfo = async () => {
    return (await axios.get(API_URL + "horses")).data.result
}

const getUserLessons = async (date: string) => {
    let params = new URLSearchParams({ date: date })
    return (await axios.get(API_URL + `lessons?${params}`)).data.result
}

const UserService = {
    addStudent,
    addLesson,
    addHorse,
    getPersonalInfo,
    getAvailableHours,
    getUserStudentsInfo,
    getHorsesInfo,
    getUserLessons,
    deleteStudent,
    deleteHorse,
    deleteLesson
}

export default UserService;