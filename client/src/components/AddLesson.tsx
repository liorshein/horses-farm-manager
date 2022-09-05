import { useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import UserService from '../services/userService';
import SearchTime from './SearchTime';

type Props = {}

type Student = {
    student_id: number
    name: string
    age: number
}

const AddLesson = (props: Props) => {
    const [studentInfo, setStudentInfo] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState('')
    const [availableHours, setAvailableHours] = useState<string[]>([])

    useEffect(() => {
        const getData = async () => {
            const userData = await UserService.getUserBoard()
            setStudentInfo(userData.studentsInfo)
        }
        getData()
    }, [])

    const handleClick = () => {
        
    }

    return (
        <div>

            <SearchTime setAvailableHours={setAvailableHours}/>

            <span className="content">
                <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                    <option>Pick Student</option>
                    {studentInfo.map((student: Student) => {
                        return <option key={student.student_id} value={student.student_id}>{student.name}</option>
                    }
                    )}</select>
            </span>

            <span className="content">
                <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                    <option>Pick Hour</option>
                    {availableHours.map((hour: string) => {
                        return <option key={hour} value={hour}>{hour}</option>
                    }
                    )}</select>
            </span>

            <button onClick={handleClick}>add</button>
        </div>
    )
}

export default AddLesson