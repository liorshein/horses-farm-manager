import { useEffect, useState } from 'react'
import AddLesson from '../../components/AddLesson';
import { useAuth } from '../../components/AuthProvider';
import UserService from '../../services/userService';

type Lesson = {
  lesson_id: number
  horse_name: string
  date: string
  lesson_time: string
  student_name: string
}

const Lessons = () => {
  const [lessons, setLessons] = useState<Lesson[]>([])

  useEffect(() => {
    const getData = async () => {
      const lessonsData = await UserService.getUserLessons()
      setLessons(lessonsData)
    }
    getData()
  }, [])

  console.log(lessons);
  

  const appContext = useAuth();
  if (!appContext) return null
  const { token } = appContext

  return (
    <>
      <h1>Lessons (Protected)</h1>

      <div>Authenticated as "{token}"</div>

      <AddLesson />

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