import { useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import UserService from '../services/userService';
import SearchTime from './SearchTime';

type Props = {
    day: Date
    setDay: (a: Date) => void
}

type Student = {
    student_id: number
    student_name: string
    age: number
}

const AddLesson = (props: Props) => {
    const [studentInfo, setStudentInfo] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState('')
    const [availableHours, setAvailableHours] = useState<string[]>([])
    const [selectedHour, setSelectedHour] = useState('')
    const [selectedHorseId, setSelectedHorseId] = useState('')

    useEffect(() => {
        const getData = async () => {
            const studentsData = await UserService.getUserStudentsInfo()
            setStudentInfo(studentsData)
        }
        getData()
    }, [])

    const handleClick = () => {
        let dateFormat = props.day.toISOString().split("T")[0];
        UserService.addLesson(Number(selectedHorseId), dateFormat, selectedHour, Number(selectedStudent))
    }

    return (
        <form>

            <SearchTime setAvailableHours={setAvailableHours} selectedHorse={selectedHorseId} setSelectedHorse={setSelectedHorseId} day={props.day} setDay={props.setDay}/>

            <span className="content">
                <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                    <option>Pick Student</option>
                    {studentInfo.map((student: Student) => {
                        return <option key={student.student_id} value={student.student_id}>{student.student_name}</option>
                    }
                    )}</select>
            </span>

            <span className="content">
                <select value={selectedHour} onChange={(e) => setSelectedHour(e.target.value)}>
                    <option>Pick Hour</option>
                    {availableHours.map((hour: string) => {
                        return <option key={hour} value={hour}>{hour}</option>
                    }
                    )}</select>
            </span>

            <button onClick={handleClick}>add</button>
        </form>
    )
}

export default AddLesson