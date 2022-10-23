import { HorseData } from "../../util/types";
import styles from "./dashboard.module.scss"

type Props = {
    data: HorseData | undefined
}

const FavHorseComp = ({ data }: Props) => {
    return (
        <div className={styles.content}>
            <h2 className={styles.title}>Favorite Horse</h2>
            <h3 className={styles.favorite}>{data?.horse_name}</h3>
        </div>
    )
}

export default FavHorseComp