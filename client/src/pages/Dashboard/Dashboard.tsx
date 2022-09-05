import { useEffect, useState } from 'react'
import AddLesson from '../../components/AddLesson';
import { useAuth } from '../../components/AuthProvider';
import UserService from '../../services/userService';


const Dashboard = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
  });

  useEffect(() => {
    const getData = async () => {
      const userData = await UserService.getUserBoard()
      setPersonalInfo(userData.personalInfo)
    }
    getData()
  }, [])  

  const appContext = useAuth();
  if (!appContext) return null
  const { token } = appContext

  return (
    <>
      <h1>Dashboard (Protected)</h1>

      <div>Authenticated as "{token}"</div>      

      <div className="content">
        <h2>Personal Info</h2>
        <h3>{personalInfo.name}</h3>
        <h3>{personalInfo.email}</h3>
        <h3>{personalInfo.phone_number}</h3>
        <h3>{personalInfo.address}</h3>
      </div>

      <AddLesson />

    </>
  )
}

export default Dashboard