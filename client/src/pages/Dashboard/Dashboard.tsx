import { useEffect, useState } from 'react'
import AddLesson from '../../components/AddLesson';
import { useAuth } from '../../components/AuthProvider';
import UserService from '../../services/userService';

type Props = {}

export type Lesson = {
  range: Date[]
}

const Dashboard = (props: Props) => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
  });
  const [horsesHours, setHorsesHours] = useState<any>()

  useEffect(() => {
    const getData = async () => {
      const userData = await UserService.getUserBoard()
      const horsesHour = await UserService.getHorseWorkHours()     
      setPersonalInfo(userData.personalInfo)
      setHorsesHours(horsesHour.data.result.rows)
    }
    getData()
  }, [])

  console.log("horsesHours", horsesHours);
  

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