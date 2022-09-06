import axios from "axios";

axios.defaults.withCredentials = true

const API_URL = "http://localhost:5000/";

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

const addStudent = (name: string, age: string, weight: string, background_info: string) => {
    axios.post(API_URL + "add-student", {
        name: name,
        age: age,
        weight: weight,
        background_info: background_info
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

const getUserLessons = async () => {
    return (await axios.get(API_URL + "lessons")).data.result
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
}

export default UserService;