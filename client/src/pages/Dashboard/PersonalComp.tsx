import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import styles from "./dashboard.module.scss"

type Props = {
    data: {
        instructor_name: string;
        email: string;
        phone_number: string;
        address: string;
    }
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