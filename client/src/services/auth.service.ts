import axios from "axios";

const API_URL = "http://localhost:5000/";

const register = (fullname: string, username: string, email: string, password: string, phone_number: string, address: string) => {
    axios.post(API_URL + "signup", {
        name: fullname,
        username: username,
        email: email,
        password: password,
        phone_number: phone_number,
        address: address,
    });
};

const login = async (username: string, password: string) => {
    const response = await axios.post(API_URL + "signin", {
        username: username,
        password: password
    });

    return response.data
};

const AuthService = {
    register,
    login,
}

export default AuthService;