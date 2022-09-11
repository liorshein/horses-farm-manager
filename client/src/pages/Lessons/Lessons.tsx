import { useEffect, useState } from 'react'
import AddLesson from './AddLesson';
import Navigation from '../../components/Navigation/Navigation';
import UserService from '../../services/userService';
import styles from "./lessons.module.scss"
import LessonComp from './LessonComp';
import DatePicker from 'react-datepicker'
import { isSaturday } from './SearchTime';
const logo = require("../../assets/icons/logo.svg")
const leftArrow = require("../../assets/icons/leftarrow.svg")
const rightArrow = require("../../assets/icons/rightarrow.svg")
const clalit = require("../../assets/icons/clalit.svg")
const meuhedet = require("../../assets/icons/meuhedet.svg")
const macabi = require("../../assets/icons/macabi.svg")

// TODO (2): Create this features on server and client sides
// TODO (3): Style page

const hmoNames = [clalit, macabi, meuhedet]

export type Lesson = {
  lesson_id: number
  horse_name: string
  date: string
  lesson_time: string
  student_name: string
  hmo: number | string
}

const Lessons = () => {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [mainDay, setMainDay] = useState(new Date())
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
      let dateFormatted = mainDay.toISOString().split("T")[0];
      const lessonsData = await UserService.getUserLessons(dateFormatted)
      setLessons(lessonsData)
    }
    getData()
  }, [mainDay])

  const deleteLesson = (id: number) => {
    UserService.deleteLesson(id.toString())
    setLessons(() => {
      return lessons.filter(lesson => lesson.lesson_id !== id)
    })
  }

  const dateRight = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    let nextDay = mainDay.setDate(mainDay.getDate() + 1)
    setMainDay(new Date(nextDay))
  }

  const dateLeft = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    let prevDay = mainDay.setDate(mainDay.getDate() - 1)
    setMainDay(new Date(prevDay))
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
        <div className={styles.date_container}>
          <button onClick={dateLeft} className={styles.arrowBtn}><img className={styles.arrow} src={leftArrow.default} alt="logo" /></button>
          <div>
            <DatePicker
              dateFormat="d/M/yyyy"
              selected={mainDay}
              onChange={(date: Date) => setMainDay(date)}
              filterDate={isSaturday}
            />
          </div>
          <button onClick={dateRight} className={styles.arrowBtn}><img className={styles.arrow} src={rightArrow.default} alt="logo" /></button>
        </div>
        <AddLesson mainDay={mainDay} setMainDay={setMainDay} day={day} setDay={setDay} setLessons={setLessons} />
        <div className={styles.lesson_container}>
          <div className={styles.content}>08:00-08:45</div>
          < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="08:00-08:45" />
        </div>
        <div className={styles.lesson_container}>
          <div className={styles.content}>08:45-09:30</div>
          < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="08:45-09:30" />
        </div>
        <div className={styles.lesson_container}>
          <div className={styles.content}>09:30-10:15</div>
          < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="09:30-10:15" />
        </div>
        <div className={styles.lesson_container}>
          <div className={styles.content}>10:15-11:00</div>
          < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="10:15-11:00" />
        </div>
        <div className={styles.lesson_container}>
          <div className={styles.content}>11:00-11:45</div>
          < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="11:00-11:45" />
        </div>
        <div className={styles.lesson_container}>
          <div className={styles.content}>11:45-12:30</div>
          < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="11:45-12:30" />
        </div>
        <div className={styles.lesson_container}>
          <div className={styles.content}>12:30-13:15</div>
          < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="12:30-13:15" />
        </div>
        <div className={styles.lesson_container}>
          <div className={styles.content}>13:15-14:00</div>
          < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="13:15-14:00" />
        </div>
        <div className={styles.lesson_container}>
          <div className={styles.content}>14:00-14:45</div>
          < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="14:00-14:45" />
        </div>
        <div className={styles.lesson_container}>
          <div className={styles.content}>14:45-15:30</div>
          < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="14:45-15:30" />
        </div>
        <div className={styles.lesson_container}>
          <div className={styles.content}>15:30-16:15</div>
          < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="15:30-16:15" />
        </div>
        <div className={styles.lesson_container}>
          <div className={styles.content}>16:15-17:00</div>
          < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="16:15-17:00" />
        </div>
        <div className={styles.lesson_container}>
          <div className={styles.content}>17:00-17:45</div>
          < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="17:00-17:45" />
        </div>
        <div className={styles.lesson_container}>
          <div className={styles.content}>17:45-18:30</div>
          < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="17:45-18:30" />
        </div>
        {/*
        {lessons.map((lesson: Lesson) => {
          return <div key={lesson.lesson_id} className={styles.lesson_container}>
            <div>{lesson.lesson_time}</div>
            <div>{lesson.horse_name}</div>
            <div>{lesson.student_name}</div>
            <img className={styles.svg} src={hmoNames[lesson.hmo as number].default} alt={hmoNames[lesson.hmo as number].toString()} />
            <button onClick={() => deleteLesson(lesson.lesson_id)}>Delete</button>
          </div>
        })} */}
      </div>
    </div>
  )
}

export default Lessons