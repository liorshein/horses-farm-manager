import axios from "axios";

const PORT = process.env.PORT

const API_URL = PORT + "/";
console.log(API_URL)
const register = async (fullname: string, email: string, password: string, phone_number: string, address: string) => {
    const result = await axios.post(API_URL + "signup", {
        name: fullname,
        email: email,
        password: password,
        phone_number: phone_number,
        address: address,
    });

    return result
};

const login = async (email: string, password: string) => {    
    const response = await axios.post(API_URL + "signin", {
        email: email,
        password: password
    });

    return response.data
};

const AuthService = {
    register,
    login,
}

export default AuthService;