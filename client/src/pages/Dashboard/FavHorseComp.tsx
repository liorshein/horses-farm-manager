import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import styles from "./dashboard.module.scss"

type Props = {
    data: string
}
const FavHorseComp = ({data}: Props) => {
    return (
        <div className={styles.content}>
            <h2 className={styles.title}>Favorite Horse</h2>
            <h3 className={styles.favorite}>{data}</h3>
        </div>
    )
}

export default FavHorseComp