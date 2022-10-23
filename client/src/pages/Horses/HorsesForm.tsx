import { useFetcher } from "react-router-dom"
import { Horse } from "../../util/types"
import styles from "./horses.module.scss"

type Props = {
    edit: boolean
    hidden: boolean
    inputs: Horse
    setInputs: React.Dispatch<React.SetStateAction<Horse>>
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
    setHidden: React.Dispatch<React.SetStateAction<boolean>>
}

const HorsesForm = ({ edit, hidden, inputs, setInputs, setEdit, setHidden }: Props) => {
    const fetcher = useFetcher()

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
        setInputs(cleanForm)
    }

    return (
        <>
            <fetcher.Form method={edit ? 'put' : 'post'} className={hidden ? styles.hidden : styles.form}>
                <h2 className={styles.title}>Add Horse</h2>
                <input className={styles.hidden} type="number" name="horse_id" id="horse_id" value={inputs.horse_id} onChange={handleChange} />
                <div className={styles.form_group}>
                    <label>Name</label>
                    <input type="text" name="horse_name" id="name" value={inputs.horse_name} onChange={handleChange} />
                </div>
                <div className={styles.form_group}>
                    <label>Age</label>
                    <input type="number" name="age" id="age" value={inputs.age} onChange={handleChange} />
                </div>
                <div className={styles.form_group}>
                    <label>Breed</label>
                    <input type="text" name="breed" id="breed" value={inputs.breed} onChange={handleChange} />
                </div>
                <div className={styles.form_select}>
                    <label>Assignable?</label>
                    <select name="assignable" id="assignable" value={inputs.assignable as string} onChange={handleChange}>
                        <option>True</option>
                        <option>False</option>
                    </select>
                </div>
                <div className={styles.flex}>
                    {!edit ? <button type="submit" className={styles.Btns} onClick={() => setHidden(true)}>Add Horse</button>
                        : <button className={styles.Btns}>Update Horse</button>}
                    <button className={styles.Btns} onClick={shiftStateForm}>Return</button>
                </div>
            </fetcher.Form>
            <button className={styles.addBtn} onClick={shiftStateForm}>Add Horse</button>
        </>
    )
}

const cleanForm = {
    horse_id: 0,
    horse_name: '',
    age: '',
    breed: '',
    assignable: 'True',
}

export default HorsesForm