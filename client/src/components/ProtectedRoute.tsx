import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';

type Props = {
    children: any
}

const ProtectedRoute = (props: Props) => {
    const location = useLocation()
    const token = new Cookies().get('token');
    
    if (!token) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return props.children
}

export default ProtectedRoute