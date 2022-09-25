import axios from "axios";

const API = "http://localhost:5000" // Remove the API from all requests for heroku

const register = async (fullname: string, email: string, password: string, phone_number: string, address: string) => {
    const result = await axios.post(API + "/api/signup", {
        name: fullname,
        email: email,
        password: password,
        phone_number: phone_number,
        address: address,
    });

    return result
};

const login = async (email: string, password: string) => {    
    const response = await axios.post(API + "/api/signin", {
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