import { useEffect, useState } from "react"
import { axiosPrivate } from "../../api/axios"
import useAuth from "../../hooks/useAuth"
import { Lesson } from "../../util/types"
import styles from "./lessons.module.scss"
const clalit = require("../../assets/icons/clalit.svg").default
const meuhedet = require("../../assets/icons/meuhedet.svg").default
const macabi = require("../../assets/icons/macabi.svg").default

type Props = {
    lesson: Lesson | undefined
    deleteLesson: (id: number) => void
}

const hmoNames = [clalit, macabi, meuhedet]

const LessonComp = ({ lesson, deleteLesson }: Props) => {
    const { roles } = useAuth()!
    const [arrived, setArrived] = useState<string | undefined>(undefined)
    const [status, setStatus] = useState(false)

    useEffect(() => {
        const getData = () => {
            try {
                if (lesson?.arrived) {
                    setArrived(lesson.arrived)
                    setStatus(true)
                } else {
                    setArrived(undefined)
                    setStatus(false)
                }
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    })

    const handleChange = (e: any) => {
        if (e.target.value !== "undefined" && e.target.value !== "Arrived?") {
            console.log(e.target.value);
            setArrived(e.target.value)
            e.target.setAttribute("disabled", "disabled")
            let params = new URLSearchParams({ lesson_id: lesson!.lesson_id.toString(), arrived: e.target.value })
            axiosPrivate.put(`/instructors/update-arrived?${params}`)
        }
    }

    return (lesson ?
        <>
            <span className={styles.content}>{lesson.student_name}</span>
            <span className={styles.content}>{lesson.horse_name}</span>
            <img className={styles.svg} src={hmoNames[lesson.hmo as number]} alt={hmoNames[lesson.hmo as number].toString()} />
            <select className={styles.arrivedSelect} value={arrived} onChange={handleChange} disabled={status}>
                <option value={undefined}>Arrived?</option>
                <option value="True">True</option>
                <option value="False">False</option>
            </select>
            {!roles.includes("User") ? <button className={styles.deleteBtn} onClick={() => deleteLesson(lesson.lesson_id)}>&#10006;</button> : <></>}
        </> : null
    )
}

export default LessonComp