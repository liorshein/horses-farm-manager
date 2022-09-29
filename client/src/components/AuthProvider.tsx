import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios'

type Props = {
    children: any
}

interface ContextInterface {
    onLogin: (e: any) => void;
    onLogout: () => void;
    loginValues: {
        email: string
        password: string
    }
    onChange: (event: {
        target: {
            name: string;
            value: string;
        };
    }) => void
    token: string | undefined;
    roles: string[];
    setToken: React.Dispatch<React.SetStateAction<undefined>>;
}

interface stateType {
    from: { pathname: string }
}

export const AuthContext = React.createContext<ContextInterface | null>(null)

const AutoProvider = (props: Props) => {
    const navigate = useNavigate()
    const location = useLocation().state as stateType;
    const [loginInputs, setLoginInputs] = useState({
        email: "",
        password: "",
    })
    const [roles, setRoles] = useState([])
    const [token, setToken] = useState();

    const handleChange = (event: { target: { name: string; value: string } }) => {
        setLoginInputs({ ...loginInputs, [event.target.name]: event.target.value })
    }

    const handleLogin = async (e: any) => {
        e.preventDefault()
        if (loginInputs.email !== '' && loginInputs.password !== '') {
            const response = (await axios.post("/auth", {
                email: loginInputs.email,
                password: loginInputs.password
            },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                })).data

                console.log(response);
                

            if (response) {
                setToken(response.accessToken)
                setRoles(response.roles)
                const origin = location?.from?.pathname || '/dashboard';
                navigate(origin);
            } else {
                alert("Wrong password / email")
            }
        } else {
            alert("Enter valid password and email")
        }
    };

    const handleLogout = async () => {
        await axios.get("/logout", { withCredentials: true })
        setToken(undefined)
        navigate('/login');
    };

    const value = {
        onLogin: handleLogin,
        onLogout: handleLogout,
        loginValues: loginInputs,
        onChange: handleChange,
        setToken: setToken,
        roles: roles,
        token: token,
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AutoProvider