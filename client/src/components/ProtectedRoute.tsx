import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth'
import jwt_decode from 'jwt-decode'

type Props = {
    children: any
    allowedRoles: string[]
}

const ProtectedRoute = (props: Props) => {
    const location = useLocation()
    const { token } = useAuth()!

    const decoded: any = token ? jwt_decode(token) : undefined    
    const roles = decoded?.UserInfo?.roles || []

    if (!roles.find((role: string) => props.allowedRoles?.includes(role))) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return props.children
}

export default ProtectedRoute