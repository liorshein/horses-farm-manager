import { useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import CheckHours from './CheckHours';
import styles from './lessons.module.scss'
import { axiosPrivate } from '../../api/axios';
import { Lesson, Student } from '../../util/types';

type Props = {
    date: Date
    setDate: React.Dispatch<React.SetStateAction<Date>>
    setLessons: (value: React.SetStateAction<Lesson[]>) => void
    selectedInstructor: string
}

const AddLesson = ({ date, setDate, setLessons, selectedInstructor }: Props) => {
    const [studentInfo, setStudentInfo] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState('')
    const [availableHours, setAvailableHours] = useState<string[]>([])
    const [selectedHour, setSelectedHour] = useState('')
    const [selectedHorseId, setSelectedHorseId] = useState('')
    const [hidden, setHidden] = useState(true)

    const shiftStateForm = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if (hidden === true) {
            setHidden(false)
        } else {
            setHidden(true)
        }
    }

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getData = async () => {
            try {
                if (selectedInstructor !== "") {
                    let params = new URLSearchParams({ instructor_id: selectedInstructor })
                    const studentsData = await (await axiosPrivate.get(`/admin/instructor-students?${params}`)).data.result
                    isMounted && setStudentInfo(studentsData)
                }
            } catch (error) {
                console.error(error);
            }
        }
        getData()

        return () => {
            isMounted = false;
            controller.abort()
        }
    }, [selectedInstructor])

    const handleClick = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if (selectedHorseId !== '' && selectedHour !== '' && selectedStudent !== '' && selectedInstructor !== "") {
            let dateFormat = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate()
            
            let newLesson: any = {
                horse_id: Number(selectedHorseId),
                date: dateFormat,
                lesson_time: selectedHour,
                student_id: Number(selectedStudent),
                instructor_id: Number(selectedInstructor)
            }

            const response = await axiosPrivate.post("/admin/add-lesson", newLesson)

            if (response.status === 200) {
                let params = new URLSearchParams({ date: dateFormat, instructor_id: selectedInstructor })
                const lessonsData = await (await axiosPrivate.get(`/admin/instructor-lessons?${params}`)).data.result
                setLessons(lessonsData)
            }
        } else {
            alert("Please select valid info!")
        }
    }

    return (
        <>
            <button className={styles.addBtn} onClick={shiftStateForm}>Add Lesson</button>
            <form className={hidden ? styles.hidden : styles.form}>
                <h2 className={styles.title}>Add Lesson</h2>
                <CheckHours selectedInstructor={selectedInstructor} setAvailableHours={setAvailableHours} selectedHorse={selectedHorseId} setSelectedHorse={setSelectedHorseId} date={date} setDate={setDate} />
                <div className={styles.select_multi}>
                    <div className={styles.students}>
                        <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                            <option>Pick Student</option>
                            {studentInfo.map((student: Student) => {
                                return <option key={student.student_id} value={student.student_id}>{student.student_name}</option>
                            }
                            )}</select>
                    </div>
                    <div className={styles.hours}>
                        <select className={styles.hours} value={selectedHour} onChange={(e) => setSelectedHour(e.target.value)}>
                            <option>Pick Hour</option>
                            {availableHours.map((hour: string) => {
                                return <option key={hour} value={hour}>{hour}</option>
                            }
                            )}</select>
                    </div>
                </div>
                <div className={styles.flex}>
                    <button className={styles.LessonBtns} onClick={handleClick}>add</button>
                    <button className={styles.LessonBtns} onClick={shiftStateForm}>Return</button>
                </div>
            </form>
        </>
    )
}

export default AddLesson