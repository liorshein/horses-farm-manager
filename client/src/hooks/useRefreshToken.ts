import useAuth from './useAuth';
import AuthService from '../services/authService';

const useRefreshToken = () => {
    const appContext = useAuth();
    if (!appContext) return null
    const { setToken } = appContext

    const refresh = async () => {
        const response = await AuthService.refresh()
        setToken(response.accessToken)
        return response.accessToken;
    }
    return refresh;
};

export default useRefreshToken;