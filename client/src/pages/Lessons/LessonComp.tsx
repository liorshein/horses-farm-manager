import { useEffect, useState } from "react"
import styles from "./lessons.module.scss"
const clalit = require("../../assets/icons/clalit.svg")
const meuhedet = require("../../assets/icons/meuhedet.svg")
const macabi = require("../../assets/icons/macabi.svg")

type Lesson = {
    lesson_id: number
    horse_name: string
    date: string
    lesson_time: string
    student_name: string
    hmo: number | string
}

type Props = {
    lessons: Lesson[]
    deleteLesson: (id: number) => void
    hour: string
}

const hmoNames = [clalit, macabi, meuhedet]

const LessonComp = (props: Props) => {
    const [currentLesson, setCurrentLesson] = useState<Lesson>()

    useEffect(() => {
        const getData = () => {
            let filteredLesson = props.lessons.filter((lesson: Lesson) => { return lesson.lesson_time === props.hour })
            setCurrentLesson(filteredLesson[0])
        }
        getData()
    })

    return (currentLesson ?
        <>
            <div className={styles.content}>{currentLesson.student_name}</div>
            <div className={styles.content}>{currentLesson.horse_name}</div>
            <img className={styles.svg} src={hmoNames[currentLesson.hmo as number].default} alt={hmoNames[currentLesson.hmo as number].toString()} />
            <button onClick={() => props.deleteLesson(currentLesson.lesson_id)}>Delete</button>
        </> : <></>
    )
}

export default LessonComp