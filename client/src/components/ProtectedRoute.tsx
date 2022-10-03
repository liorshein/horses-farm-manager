import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

type Props = {
    children: any
    allowedRoles: string[]
}

const ProtectedRoute = (props: Props) => {
    const location = useLocation()
    const { roles } = useAuth()!   

    if (!roles.find((role: string) => props.allowedRoles?.includes(role))) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return props.children
}

export default ProtectedRoute