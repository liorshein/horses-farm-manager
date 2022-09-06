import { useEffect, useState } from 'react'
import UserService from '../../services/userService';


// TODO (1): Decide what to show on dashboard page (number of lessons today, number of lessons monthly, salary...)
// TODO (2): Create this features on server and client sides
// TODO (3): Style page



const Dashboard = () => {
  const [personalInfo, setPersonalInfo] = useState({
    instructor_name: '',
    email: '',
    phone_number: '',
    address: '',
  });

  useEffect(() => {
    const getData = async () => {
      const personalData = await UserService.getPersonalInfo()
      setPersonalInfo(personalData)
    }
    getData()
  }, [])

  return (
    <>
      <h1>Dashboard (Protected)</h1>

      <div className="content">
        <h2>Personal Info</h2>
        <h3>{personalInfo.instructor_name}</h3>
        <h3>{personalInfo.email}</h3>
        <h3>{personalInfo.phone_number}</h3>
        <h3>{personalInfo.address}</h3>
      </div>
    </>
  )
}

export default Dashboard