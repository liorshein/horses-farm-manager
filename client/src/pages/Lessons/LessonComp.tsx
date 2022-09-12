import { SetStateAction, useEffect, useRef, useState } from "react"
import UserService from "../../services/userService"
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
    arrived: boolean
}

type Props = {
    lessons: Lesson[]
    deleteLesson: (id: number) => void
    hour: string
}

const hmoNames = [clalit, macabi, meuhedet]

const LessonComp = (props: Props) => {
    const [currentLesson, setCurrentLesson] = useState<Lesson>()
    const [arrived, setArrived] = useState<string | undefined>(undefined)
    const [status, setStatus] = useState(false)

    useEffect(() => {
        const getData = () => {
            let filteredLesson = props.lessons.filter((lesson: Lesson) => { return lesson.lesson_time === props.hour })
            setCurrentLesson(filteredLesson[0])
            if (currentLesson?.arrived === true) {
                setArrived("True")
                setStatus(true)
            } else if (currentLesson?.arrived === false) {
                setArrived("False")
                setStatus(true)
            } else {
                setArrived(undefined)
                setStatus(false)
            }
        }
        getData()
    })    

    const handleChange = (e: { target: { value: SetStateAction<string | undefined>; setAttribute: (arg0: string, arg1: string) => void } }) => {
        if (e.target.value !== "undefined" && e.target.value !== "Arrived?") {
            setArrived(e.target.value)
            e.target.setAttribute("disabled", "disabled")
            let boolean: string = e.target.value as string
            UserService.updateArrived(currentLesson!.lesson_id.toString(), boolean)
        }
    }
    
    return (currentLesson ?
        <>
            <div className={styles.content}>{currentLesson.student_name}</div>
            <div className={styles.content}>{currentLesson.horse_name}</div>
            <div className={styles.content}>
                <img className={styles.svg} src={hmoNames[currentLesson.hmo as number].default} alt={hmoNames[currentLesson.hmo as number].toString()} />
            </div>
            <select className={styles.arrivedSelect} value={arrived} onChange={handleChange} disabled={status}>
                <option value={undefined}>Arrived?</option>
                <option value="True">True</option>
                <option value="False">False</option>
            </select>
            <button className={styles.deleteBtn} onClick={() => props.deleteLesson(currentLesson.lesson_id)}>&#10006;</button>
        </> : <></>
    )
}

export default LessonComp