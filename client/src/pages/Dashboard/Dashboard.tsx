import useAuth from '../../hooks/useAuth';
import UserDashboard from './UserDashboard ';
import AdminDashboard from './AdminDashboard';

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
