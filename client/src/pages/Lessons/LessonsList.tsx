import styles from "./lessons.module.scss"
import { Lesson } from "../../util/types"
import LessonComp from "./LessonComp"

type Props = {
  lessons: Lesson[]
  deleteLesson: (id: number) => void
}

const LessonsList = ({ lessons, deleteLesson }: Props) => {
  return (
    <div className={styles.wrapper_container}>
      {workHours.map((hourRange: string) => {
        return (
          <div className={styles.lesson_container} key={hourRange}>
            <span className={styles.content}>{hourRange}</span>
            <LessonComp lesson={filteredLesson(hourRange, lessons)} deleteLesson={deleteLesson} />
          </div>
        )
      })}
    </div>
  )
}

const filteredLesson = (hourRage: string, lessons: Lesson[]) => {
  const lesson = lessons.find((lesson: Lesson) => lesson.lesson_time === hourRage)
  return lesson
}

const workHours = [
  "08:00-08:45",
  "08:45-09:30",
  "09:30-10:15",
  "10:15-11:00",
  "11:00-11:45",
  "11:45-12:30",
  "12:30-13:15",
  "13:15-14:00",
  "14:00-14:45",
  "14:45-15:30",
  "15:30-16:15",
  "16:15-17:00",
  "17:00-17:45",
  "17:45-18:30"
];

export default LessonsList