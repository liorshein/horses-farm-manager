import { AxiosError } from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyError } from "../util/toastFunc";

type Props = {
    children: any;
};

interface ContextInterface {
    onLoginTest: (e: any, number: number) => void;
    onLogin: (e: any) => void;
    onLogout: () => void;
    loginValues: {
        email: string;
        password: string;
    };
    onChange: (event: {
        target: {
            name: string;
            value: string;
        };
    }) => void;
    roles: string[];
    setRoles: React.Dispatch<React.SetStateAction<string[]>>;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    userId: number;
}

interface stateType {
    from: { pathname: string };
}

export const AuthContext = React.createContext<ContextInterface | null>(null);

const AutoProvider = (props: Props) => {
    const navigate = useNavigate();
    const location = useLocation().state as stateType;
    const [loginInputs, setLoginInputs] = useState({
        email: "",
        password: "",
    });
    const [roles, setRoles] = useState<string[]>([]);
    const [name, setName] = useState("");
    const [userId, setUserId] = useState(0);

    const handleChange = (event: {
        target: { name: string; value: string };
    }) => {
        setLoginInputs({
            ...loginInputs,
            [event.target.name]: event.target.value,
        });
    };

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "/auth",
                {
                    email: loginInputs.email,
                    password: loginInputs.password,
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            setUserId(response.data.userId);
            setRoles(response.data.roles);
            setName(response.data.userName);
            const origin = location?.from?.pathname || "/dashboard";
            navigate(origin);
        } catch (error) {
            if (error instanceof AxiosError) {
                notifyError(error.response?.data.message)
            }
        }
    };

    const handleLoginTest = async (e: any, number: number) => {
        e.preventDefault();
        let response;

        if (number === 1) {
            response = await axios.post(
                "/auth",
                {
                    email: "admin@gmail.com",
                    password: "admin123",
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
        } else {
            response = await axios.post(
                "/auth",
                {
                    email: "lior@gmail.com",
                    password: "lior123",
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
        }

        if (response.status === 200) {
            setUserId(response.data.userId);
            setRoles(response.data.roles);
            setName(response.data.userName);
            const origin = location?.from?.pathname || "/dashboard";
            navigate(origin);
        } else {
            alert("Something went wrong, please try again");
        }
    };

    const handleLogout = async () => {
        await axios.get("/logout", { withCredentials: true });
        navigate("/login");
    };

    const value = {
        onLogin: handleLogin,
        onLoginTest: handleLoginTest,
        onLogout: handleLogout,
        loginValues: loginInputs,
        onChange: handleChange,
        roles: roles,
        name: name,
        setRoles: setRoles,
        setName: setName,
        userId: userId,
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
            <ToastContainer />
        </AuthContext.Provider>
    );
};

export default AutoProvider;
