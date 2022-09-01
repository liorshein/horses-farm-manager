import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider'

type Props = {
    children: any
}

const ProtectedRoute = (props: Props) => {
    const appContext = useAuth();
    const location = useLocation()
    
    if (!appContext) return null
    const { token } = appContext    
    
    if (!token) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return props.children
}

export default ProtectedRoute