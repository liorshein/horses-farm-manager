import { useEffect, useState } from 'react'
import AddLesson from './AddLesson';
import Navigation from '../../components/Navigation/Navigation';
import UserService from '../../services/userService';
import styles from "./lessons.module.scss"
const logo = require("../../assets/icons/logo.svg")

// TODO (1): Decide what to show on lessons page (All lessons per date) organized by hours.
// TODO (2): Create this features on server and client sides
// TODO (3): Style page

type Lesson = {
  lesson_id: number
  horse_name: string
  date: string
  lesson_time: string
  student_name: string
}

const Lessons = () => {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [day, setDay] = useState(new Date())
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

  useEffect(() => {
    const getData = async () => {
      let dateFormat = day.toISOString().split("T")[0];
      const lessonsData = await UserService.getUserLessons(dateFormat)
      setLessons(lessonsData)
    }
    getData()
  }, [day])

  const deleteLesson = (id: number) => {
    UserService.deleteLesson(id.toString())
    setLessons(() => {
      return lessons.filter(lesson => lesson.lesson_id !== id)
    })
  }

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src={logo.default} alt="logo" />
        </div>
        <div className={styles.personal_info_nav}>
          <h1 className={styles.name}>{personalInfo.instructor_name.split(' ')[0]} <br /> {personalInfo.instructor_name.split(' ')[1]}</h1>
          <p className={styles.job}>Instructor</p>
        </div>
        <div className={styles.links}>
          <Navigation />
        </div>
      </nav>
      <div className={styles.main_content}>
        <AddLesson day={day} setDay={setDay} />
        {lessons.map((lesson: Lesson) => {
          return <div key={lesson.lesson_id} className={styles.student_container}>
            <div>Date: {lesson.date}</div>
            <div>Time: {lesson.lesson_time}</div>
            <div>Horse: {lesson.horse_name}</div>
            <div>Student: {lesson.student_name}</div>
            <button onClick={() => deleteLesson(lesson.lesson_id)}>Delete</button>
          </div>
        })}
      </div>
    </div>
  )
}

export default Lessons