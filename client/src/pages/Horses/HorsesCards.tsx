import { useFetcher } from "react-router-dom"
import { Horse } from "../../util/types"
import styles from "./horses.module.scss"

type Props = {
    horsesData: Horse[]
    roles: string[]
    searchTerm: string
    setHidden: React.Dispatch<React.SetStateAction<boolean>>
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
    setInputs: React.Dispatch<React.SetStateAction<Horse>>
}

const HorsesCards = ({ horsesData, roles, searchTerm, setHidden, setEdit, setInputs }: Props) => {
    const fetcher = useFetcher();

    const setForEdit = (student: Horse) => {
        setHidden(false)
        setInputs(student)
        setEdit(true)
    }

    return (
        <div className={styles.flexRow}>
            <div className={styles.wrapper}>
                {horsesData.filter((horse: Horse) => {
                    if (searchTerm === "") {
                        return horse
                    } else if (horse.horse_name.charAt(0).toLowerCase().includes(searchTerm.charAt(0).toLowerCase())) {
                        return horse
                    }
                }).map((horse: Horse) => {
                    return <div key={horse.horse_id} className={styles.horse_container}>
                        <div className={styles.name}>{horse.horse_name}</div>
                        <div className={styles.container}>
                            <div className={styles.info}>
                                <label className={styles.label}>Age:</label>
                                <span>{horse.age}</span>
                            </div>
                            <div className={styles.info}>
                                <label className={styles.label}>Breed:</label>
                                <span>{horse.breed}</span>
                            </div>
                            <div className={styles.info}>
                                <label className={styles.label}>Assignable:</label>
                                <span>{horse.assignable.toString()}</span>
                            </div>
                        </div>
                        {roles.includes("User") ? <></> :
                            <div className={styles.btn_div}>
                                <fetcher.Form method='delete' action={`/horses?${horse.horse_id}`}>
                                    <button className={styles.horseBtn}>Delete</button>
                                </fetcher.Form>
                                <button className={styles.horseBtn} onClick={() => setForEdit(horse)}>Edit</button>
                            </div>}
                    </div>
                })}
            </div>
        </div>
    )
}

export default HorsesCards