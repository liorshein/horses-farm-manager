import { useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import UserService from '../../services/userService';
import SearchTime from './SearchTime';
import styles from './lessons.module.scss'
import { Lesson } from './Lessons';

type Props = {
    mainDay: Date
    setMainDay: (a: Date) => void
    day: Date
    setDay: (a: Date) => void
    setLessons: (value: React.SetStateAction<Lesson[]>) => void
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
    const [hidden, setHidden] = useState(true)
    const [day, setDay] = useState(new Date())

    const shiftStateForm = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if (hidden === true) {
            setHidden(false)
        } else {
            setHidden(true)
        }
    }

    useEffect(() => {
        const getData = async () => {
            const studentsData = await UserService.getUserStudentsInfo()
            setStudentInfo(studentsData)
        }
        getData()
    }, [])

    const handleClick = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        let dateFormat = props.mainDay.toISOString().split("T")[0];
        UserService.addLesson(Number(selectedHorseId), dateFormat, selectedHour, Number(selectedStudent))
        const lessonsData = await UserService.getUserLessons(dateFormat)
        props.setLessons(lessonsData)
    }

    return (
        <>
            <button className={styles.addBtn} onClick={shiftStateForm}>Add Lesson</button>
            <form className={hidden ? styles.hidden : styles.form}>
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
                <button onClick={shiftStateForm}>Return</button>
            </form>
        </>
    )
}

export default AddLesson