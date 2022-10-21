import { useEffect, useState } from 'react'
import AddLesson from './AddLesson';
import styles from "./lessons.module.scss"
import LessonComp from './LessonComp';
import DatePicker from 'react-datepicker'
import { isSaturday } from './SearchTime';
import Loader from '../../components/Loader/Loader';
import { axiosPrivate } from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { Instructor, Lesson } from '../../util/types';
const leftArrow = require("../../assets/icons/leftarrow.svg")
const rightArrow = require("../../assets/icons/rightarrow.svg")

const Lessons = () => {
  const { roles } = useAuth()!
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [mainDay, setMainDay] = useState(new Date())
  const [day, setDay] = useState(new Date())
  const [loading, setLoading] = useState(true);
  const [instructorsInfo, setInstructorsInfo] = useState([])
  const [selectedInstructor, setSelectedInstructor] = useState('')

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      try {
        if (!roles.includes("User")) {
          const allInstructors = await (await axiosPrivate.get("/admin/instructors")).data.result
          isMounted && setInstructorsInfo(allInstructors)
        }
      } catch (error) {
        navigate('/login', { state: { from: location }, replace: true })
      }
    }
    getData()

    return () => {
      isMounted = false;
      controller.abort()
    }
  }, [])

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      if (roles.includes("User")) {
        let dateFormatted = mainDay.toISOString().split("T")[0];
        let params = new URLSearchParams({ date: dateFormatted })
        const lessonsData = await (await axiosPrivate.get(`/instructors/lessons?${params}`)).data.result
        isMounted && setLessons(lessonsData)
      } else {
        if (selectedInstructor !== "") {
          let dateFormatted = mainDay.toISOString().split("T")[0];
          let params = new URLSearchParams({ date: dateFormatted, instructor_id: selectedInstructor })
          const lessonsData = await (await axiosPrivate.get(`/admin/instructor-lessons?${params}`)).data.result
          isMounted && setLessons(lessonsData)
        } else {
          isMounted && setLessons([])
        }
      }
    }
    getData()

    return () => {
      isMounted = false;
      controller.abort()
    }

  }, [mainDay, selectedInstructor])

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
            {roles.includes("User") ? <></> :
              <>
                <select className={styles.instructor_select} name="instructor_id" id="instructor_id" value={selectedInstructor} onChange={(e) => { setSelectedInstructor(e.target.value) }}>
                  <option value=''>Choose Instructor</option>
                  {instructorsInfo.map((instructor: Instructor) => {
                    return <option key={instructor.instructor_id} value={instructor.instructor_id}>{instructor.instructor_name}</option>
                  }
                  )}
                </select>
                {selectedInstructor !== "" ? <AddLesson selectedInstructor={selectedInstructor} mainDay={mainDay} setMainDay={setMainDay} day={day} setDay={setDay} setLessons={setLessons} /> : <div className={styles.emptyDiv}></div>}
              </>}
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