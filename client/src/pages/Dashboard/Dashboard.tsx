import { useEffect, useState } from 'react'
import { useAuth } from '../../components/AuthProvider';
import UserService from '../../services/userService';

type Props = {}

type Student = {
  student_id: number
  name: string
  age: number
}

const Dashboard = (props: Props) => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
  });

  const [studentInfo, setStudentInfo] = useState<Student[]>([]);

  useEffect(() => {
    const getData = async () => {
      const userData = await UserService.getUserBoard()
      setPersonalInfo(userData.personalInfo)
      setStudentInfo(userData.studentsInfo)

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

      <div className="content">
        <h2>Students Info</h2>
        {studentInfo.map((student: Student) =>
          <div key={student.student_id}>
            <h3>{student.name}</h3>
            <h3>{student.age}</h3>
          </div>
        )}
      </div>
    </>
  )
}

export default Dashboard