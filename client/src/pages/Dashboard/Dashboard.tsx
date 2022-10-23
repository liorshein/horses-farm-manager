import useAuth from '../../hooks/useAuth';
import UserDashboard from './UserDashboard ';
import AdminDashboard from './AdminDashboard';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { getData } from '../../api/dashboard';
import { LessonsData, UserDashboardData } from '../../util/types';

export const loader: LoaderFunction = async () => {
  return getData();
}

const Dashboard = () => {
  const { roles } = useAuth()!
  const data = useLoaderData() as LessonsData[] | UserDashboardData

  return (
    <> {roles.includes("User") ?
      <UserDashboard dashboardData={data as UserDashboardData} /> : <AdminDashboard dashboardData={data as LessonsData[]} />
    }
    </>
  )
}

export default Dashboard
