import useAuth from './useAuth';
import axios from '../api/axios';

const useRefreshToken = () => {
    const appContext = useAuth();
    if (!appContext) return null
    const { setToken } = appContext

    const refresh = async () => {
        const response = await await (await axios.get("/refresh", { withCredentials: true })).data
        setToken(response.accessToken)
        return response.accessToken;
    }
    return refresh;
};

export default useRefreshToken;