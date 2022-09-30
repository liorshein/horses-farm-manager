import { useEffect, useState } from 'react'
import AddLesson from './AddLesson';
import Navigation from '../../components/Navigation/Navigation';
import styles from "./lessons.module.scss"
import LessonComp from './LessonComp';
import DatePicker from 'react-datepicker'
import { isSaturday } from './SearchTime';
import Loader from '../../components/Loader/Loader';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
const logo = require("../../assets/icons/logo.svg")
const leftArrow = require("../../assets/icons/leftarrow.svg")
const rightArrow = require("../../assets/icons/rightarrow.svg")
const clalit = require("../../assets/icons/clalit.svg")
const meuhedet = require("../../assets/icons/meuhedet.svg")
const macabi = require("../../assets/icons/macabi.svg")
const menuIcon = require("../../assets/icons/menu.svg").default

const hmoNames = [clalit, macabi, meuhedet]

export type Lesson = {
  lesson_id: number
  horse_name: string
  date: string
  lesson_time: string
  student_name: string
  hmo: number | string
  arrived: boolean
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
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(window.innerWidth)
  const [navDisplay, setNavDisplay] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    if (width <= 1000) {
      setNavDisplay(false)
    } else {
      setNavDisplay(true)
    }
  }, [width]);

  const shiftMenuDisplay = () => {
    if (navDisplay) {
      setNavDisplay(false)
    } else {
      setNavDisplay(true)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const personalData = await (await axiosPrivate.get("/instructors/user")).data.result
        setPersonalInfo(personalData)
      } catch (error) {
        navigate('/login', { state: { from: location }, replace: true })
      }
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      let dateFormatted = mainDay.toISOString().split("T")[0];
      let params = new URLSearchParams({ date: dateFormatted })
      const lessonsData = await (await axiosPrivate.get(`/instructors/lessons?${params}`)).data.result
      setLessons(lessonsData)
    }
    getData()
  }, [mainDay])

  const deleteLesson = (id: number) => {
    let params = new URLSearchParams({ lesson_id: id.toString() })
    axiosPrivate.delete(`/instructors/delete-lesson?${params}`)
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
    <> {loading ? <Loader /> :
      <div className={styles.main_container}>
        <div className={styles.menu_side} onClick={shiftMenuDisplay}>
          <img src={menuIcon} alt="logo" />
        </div>
        <nav className={navDisplay ? styles.navbar : styles.menu_hidden}>
          <div className={styles.menu} onClick={shiftMenuDisplay}>
            <img src={menuIcon} alt="logo" />
          </div>
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
          <div className={styles.upper_part}>
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
          </div>
          <div className={styles.wrapper_container}>
            <div className={styles.lesson_container}>
              <span className={styles.content}>08:00-08:45</span>
              < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="08:00-08:45" />
            </div>
            <div className={styles.lesson_container}>
              <span className={styles.content}>08:45-09:30</span>
              < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="08:45-09:30" />
            </div>
            <div className={styles.lesson_container}>
              <span className={styles.content}>09:30-10:15</span>
              < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="09:30-10:15" />
            </div>
            <div className={styles.lesson_container}>
              <span className={styles.content}>10:15-11:00</span>
              < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="10:15-11:00" />
            </div>
            <div className={styles.lesson_container}>
              <span className={styles.content}>11:00-11:45</span>
              < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="11:00-11:45" />
            </div>
            <div className={styles.lesson_container}>
              <span className={styles.content}>11:45-12:30</span>
              < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="11:45-12:30" />
            </div>
            <div className={styles.lesson_container}>
              <span className={styles.content}>12:30-13:15</span>
              < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="12:30-13:15" />
            </div>
            <div className={styles.lesson_container}>
              <span className={styles.content}>13:15-14:00</span>
              < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="13:15-14:00" />
            </div>
            <div className={styles.lesson_container}>
              <span className={styles.content}>14:00-14:45</span>
              < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="14:00-14:45" />
            </div>
            <div className={styles.lesson_container}>
              <span className={styles.content}>14:45-15:30</span>
              < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="14:45-15:30" />
            </div>
            <div className={styles.lesson_container}>
              <span className={styles.content}>15:30-16:15</span>
              < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="15:30-16:15" />
            </div>
            <div className={styles.lesson_container}>
              <span className={styles.content}>16:15-17:00</span>
              < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="16:15-17:00" />
            </div>
            <div className={styles.lesson_container}>
              <span className={styles.content}>17:00-17:45</span>
              < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="17:00-17:45" />
            </div>
            <div className={styles.lesson_container}>
              <span className={styles.content}>17:45-18:30</span>
              < LessonComp lessons={lessons} deleteLesson={deleteLesson} hour="17:45-18:30" />
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default Lessons