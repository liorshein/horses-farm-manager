import { Instructor } from "../../util/types";
import styles from "./dashboard.module.scss"

type Props = {
    data: Instructor
}

const PersonalComp = ({data}: Props) => {

    return (
        <div className={styles.content}>
            <h2 className={styles.title}>Personal Info</h2>
            <div className={styles.info}>Email: {data.email}</div>
            <div className={styles.info}>Address: {data.address}</div>
            <div className={styles.info}>Phone number: {data.phone_number}</div>
        </div>
    )
}

export default PersonalComp