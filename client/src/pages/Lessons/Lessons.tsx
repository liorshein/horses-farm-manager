import { useEffect, useState } from 'react'
import AddLesson from '../../components/AddLesson';
import UserService from '../../services/userService';

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

  useEffect(() => {
    const getData = async () => {
      let dateFormat = day.toISOString().split("T")[0];
      const lessonsData = await UserService.getUserLessons(dateFormat)
      setLessons(lessonsData)
    }
    getData()
  }, [day])  

  return (
    <>
      <h1>Lessons (Protected)</h1>

      <AddLesson day={day} setDay={setDay}/>

      <div className="content">
        <h1>Lessons:</h1>
        {lessons.map((lesson: Lesson) => {
          return <div key={lesson.lesson_id}>Lessons {lesson.lesson_id}: {lesson.date}, {lesson.lesson_time}, {lesson.horse_name}, {lesson.student_name}</div>
        })}
      </div>
    </>
  )
}

export default Lessons