import { HorseData } from "../../util/types";
import styles from "./dashboard.module.scss"

type Props = {
    data: HorseData
}

const FavHorseComp = ({ data }: Props) => {
    const { horse_name } = data

    return (
        <div className={styles.content}>
            <h2 className={styles.title}>Favorite Horse</h2>
            <h3 className={styles.favorite}>{horse_name}</h3>
        </div>
    )
}

export default FavHorseComp