import useAuth from '../../hooks/useAuth';
import UserDashboard from './UserDashboard ';
import AdminDashboard from './AdminDashboard';
import jwt_decode from 'jwt-decode'

const Dashboard = () => {
  const { roles } = useAuth()!
  
  return (
    <> {roles.includes("User") ?
      <UserDashboard /> : <AdminDashboard />
    }
    </>
  )
}

export default Dashboard
