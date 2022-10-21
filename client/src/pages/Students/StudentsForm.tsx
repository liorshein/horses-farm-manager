import { useFetcher } from "react-router-dom";
import { Instructor, Student } from "../../util/types";
import styles from "./students.module.scss"

type Props = {
    instructorsData: Instructor[]
    edit: boolean
    hidden: boolean
    inputs: Student
    setInputs: React.Dispatch<React.SetStateAction<Student>>
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
    setHidden: React.Dispatch<React.SetStateAction<boolean>>
}

const StudentsForm = ({ instructorsData, edit, setEdit, hidden, setHidden, inputs, setInputs }: Props) => {
    const fetcher = useFetcher();

    const handleChange = (event: { target: { name: string; value: string } }) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    const shiftStateForm = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if (hidden === true) {
            setHidden(false)
        } else {
            setHidden(true)
        }
        setEdit(false)
    }

    return (
        <>
            <fetcher.Form method={edit ? 'put' : 'post'} className={hidden ? styles.hidden : styles.form}>
                <h2 className={styles.title}>Add Student</h2>
                <input className={styles.hidden} type="number" name="student_id" id="student_id" value={inputs.student_id} onChange={handleChange} />
                <div className={styles.form_group}>
                    <label>Name</label>
                    <input type="text" name="student_name" id="name" value={inputs.student_name} onChange={handleChange} />
                </div>
                <div className={styles.form_group}>
                    <label>ID</label>
                    <input type="number" name="id" id="id" value={inputs.id} onChange={handleChange} />
                </div>
                <div className={styles.form_group}>
                    <label>Date of birth</label>
                    <input type="text" name="date_of_birth" id="date_of_birth" value={inputs.date_of_birth} onChange={handleChange} />
                </div>
                <div className={styles.form_group}>
                    <label>Age</label>
                    <input type="number" name="age" id="age" value={inputs.age} onChange={handleChange} />
                </div>
                <div className={styles.form_group}>
                    <label>Weight</label>
                    <input type="number" name="weight" id="weight" value={inputs.weight} onChange={handleChange} />
                </div>
                <div className={styles.form_group}>
                    <label>Height</label>
                    <input type="number" name="height" id="height" value={inputs.height} onChange={handleChange} />
                </div>
                <div className={styles.form_group}>
                    <label>Address</label>
                    <input type="text" name="address" id="address" value={inputs.address} onChange={handleChange} />
                </div>
                <div className={styles.form_group}>
                    <label>Educational framework</label>
                    <input type="text" name="framework" id="framework" value={inputs.framework} onChange={handleChange} />
                </div>
                <div className={styles.form_group}>
                    <label>Working on</label>
                    <input type="text" name="working_on" id="working_on" value={inputs.working_on} onChange={handleChange} />
                </div>
                <div className={styles.form_select}>
                    <label>HMO</label>
                    <select name="hmo" id="hmo" value={inputs.hmo} onChange={handleChange}>
                        <option value="">Choose HMO</option>
                        <option value="0">Macabi</option>
                        <option value="1">Clalit</option>
                        <option value="2">Meuhedet</option>
                    </select>
                </div>
                <div className={styles.form_select}>
                    <label>For</label>
                    <select name="instructor_id" id="instructor_id" value={inputs.instructor_id} onChange={handleChange}>
                        <option>Pick Instructor</option>
                        {instructorsData.map((instructor: Instructor) => {
                            return <option key={instructor.instructor_id} value={instructor.instructor_id}>{instructor.instructor_name}</option>
                        }
                        )}
                    </select>
                </div>
                <div className={styles.flex}>
                    {!edit ? <button className={styles.Btns}>Add Student</button>
                        : <button className={styles.Btns}>Update Student</button>}
                    <button className={styles.Btns} onClick={shiftStateForm}>Return</button>
                </div>
            </fetcher.Form>
            <button className={styles.addBtn} onClick={shiftStateForm}>Add Student</button>
        </>
    )
}

export default StudentsForm