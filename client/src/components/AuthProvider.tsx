import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import Cookies from 'universal-cookie';

type Props = {
    children: any
}

interface ContextInterface {
    onLogin: (e: any) => void;
    onLogout: () => void;
    loginValues: {
        username: string
        password: string
    }
    onChange: (event: {
        target: {
            name: string;
            value: string;
        };
    }) => void
}

interface stateType {
    from: { pathname: string }
}

export const AuthContext = React.createContext<ContextInterface | null>(null)

export const useAuth = () => {
    return React.useContext(AuthContext);
};

const AutoProvider = (props: Props) => {
    const navigate = useNavigate()
    const location = useLocation().state as stateType;
    const cookies = new Cookies()
    const [loginInputs, setLoginInputs] = useState({
        username: "",
        password: "",
    })

    const handleChange = (event: { target: { name: string; value: string } }) => {
        setLoginInputs({ ...loginInputs, [event.target.name]: event.target.value })
    }

    const handleLogin = async (e: any) => {
        e.preventDefault()
        if (loginInputs.username !== '' && loginInputs.password !== '') {
            const response = await AuthService.login(loginInputs.username, loginInputs.password)
            const newToken = response.token
    
            if (newToken) {
                let today = new Date()
                let nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
                cookies.set('token', newToken, {path: '/', expires: nextWeek})
                const origin = location?.from?.pathname || '/dashboard';
                navigate(origin);
            } else {
                alert("Wrong password / username")
            }
        } else {
            alert("Enter valid password and username")
        }
    };

    const handleLogout = () => {
        cookies.remove('token')
        navigate('/login');
    };

    const value = {
        onLogin: handleLogin,
        onLogout: handleLogout,
        loginValues: loginInputs,
        onChange: handleChange,
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AutoProvider