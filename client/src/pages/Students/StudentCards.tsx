import { useFetcher } from "react-router-dom"
import { Student } from "../../util/types"
import styles from "./students.module.scss"
const clalit = require("../../assets/icons/clalit.svg").default
const meuhedet = require("../../assets/icons/meuhedet.svg").default
const macabi = require("../../assets/icons/macabi.svg").default

type Props = {
    studentsData: Student[]
    roles: string[]
    searchTerm: string
    setHidden: React.Dispatch<React.SetStateAction<boolean>>
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
    setInputs: React.Dispatch<React.SetStateAction<Student>>
}

const hmoNames = [clalit, macabi, meuhedet]

const StudentCards = ({ studentsData, roles, searchTerm, setHidden, setEdit, setInputs }: Props) => {
    const fetcher = useFetcher();

    const setForEdit = (student: Student) => {
        setHidden(false)
        setInputs(student)
        setEdit(true)
    }

    return (
        <div className={styles.wrapper_container}>
            {studentsData.filter((student: Student) => {
                if (searchTerm === "") {
                    return student
                } else if (student.student_name.charAt(0).toLowerCase().includes(searchTerm.charAt(0).toLowerCase())) {
                    return student
                }
            }).map((student: Student) => {
                return <div key={student.student_id} className={styles.student_container}>
                    <div className={styles.name}>{student.student_name}</div>
                    <div className={styles.wrapper}>
                        <div className={styles.container}>
                            <div className={styles.content}>
                                <label className={styles.label}>ID</label>
                                <div>{student.id}</div>
                            </div>
                            <div className={styles.content}>
                                <label className={styles.label}>Date of birth</label>
                                <div>{student.date_of_birth}</div>
                            </div>
                            <div className={styles.content}>
                                <label className={styles.label}>Age</label>
                                <div>{student.age}</div>
                            </div>
                        </div>
                        <div className={styles.container}>
                            <div className={styles.content}>
                                <label className={styles.label}>Weight</label>
                                <div>{student.weight}</div>
                            </div>
                            <div className={styles.content}>
                                <label className={styles.label}>Height</label>
                                <div>{student.height}</div>
                            </div>
                            <div className={styles.content}>
                                <label className={styles.label}>Address</label>
                                <div>{student.address}</div>
                            </div>
                        </div>
                        <div className={styles.container}>
                            <div className={styles.content}>
                                <label className={styles.label}>Educational framework</label>
                                <div>{student.framework}</div>
                            </div>
                            <div className={styles.content}>
                                <label className={styles.label}>Working on</label>
                                <div>{student.working_on}</div>
                            </div>
                            {!roles.includes("User") ? <div className={styles.content}>
                                <label className={styles.label}>Instructor</label>
                                <div>{student.instructor_name}</div>
                            </div> : <></>}
                        </div>
                    </div>
                    <img className={styles.svg} src={hmoNames[student.hmo as number]} alt={hmoNames[student.hmo as number].toString()} />
                    {roles.includes("User") ? null :
                        <div className={styles.btn_div}>
                            <fetcher.Form method='delete' action={`/students?${student.student_id}`}>
                                <button className={styles.studentBtn}>Delete</button>
                            </fetcher.Form>
                            <button className={styles.studentBtn} onClick={() => setForEdit(student)}>Edit</button>
                        </div>}
                </div>
            })}
        </div>
    )
}

export default StudentCards