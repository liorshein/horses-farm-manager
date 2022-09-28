import axios from '../api/axios'

const register = async (fullname: string, email: string, password: string, phone_number: string, address: string) => {
    const result = await axios.post("/register", {
        name: fullname,
        email: email,
        password: password,
        phone_number: phone_number,
        address: address,
    });

    return result
};

const login = async (email: string, password: string) => {
    const response = await axios.post("/auth", {
        email: email,
        password: password
    },
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });

    return response.data
};

const logout = () => {
    axios.get("/logout")
}

const refresh = async () => {
    let response = await (await axios.get("/refresh", { withCredentials: true })).data
    return response
}

const AuthService = {
    register,
    login,
    logout,
    refresh,
}

export default AuthService;