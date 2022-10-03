import { NavLink } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import styles from './navbar.module.scss'
const logo = require("../assets/icons/logo.svg").default
const dashIcon = require("../assets/icons/dashboard.svg").default
const scheduleIcon = require("../assets/icons/schedule.svg").default
const manIcon = require("../assets/icons/man.svg").default
const horseIcon = require("../assets/icons/horse.svg").default
const signoutIcon = require("../assets/icons/signout.svg").default

const Navbar = () => {
    const { onLogout, roles, name } = useAuth()!    

    return (
        <>
            <div className={styles.flex_col}>
                <div className={styles.navbar}>
                    <div className={styles.logo}>
                        <img src={logo} alt="logo" />
                    </div>
                    <div className={styles.personal_info_nav}>
                        <h1 className={styles.name}>{name.split(' ')[0]} <br /> {name.split(' ')[1]}</h1>
                        <p className={styles.job}>{roles[0] === "User" ? <>Instructor</> : <></>}</p>
                    </div>
                </div>
                <div className={styles.navbar_links}>
                    <div className={styles.link_container}>
                        <img src={dashIcon} alt="dashboard icon" />
                        <NavLink className={styles.link} to="/dashboard">Dashboard</NavLink>
                    </div>
                    <div className={styles.link_container}>
                        <img src={scheduleIcon} alt="schedule icon" />
                        <NavLink className={styles.link} to="/lessons">Schedule</NavLink>
                    </div>
                    <div className={styles.link_container}>
                        <img src={manIcon} alt="man icon" />
                        <NavLink className={styles.link} to="/students">Students</NavLink>
                    </div>
                    <div className={styles.link_container}>
                        <img src={horseIcon} alt="horse icon" />
                        <NavLink className={styles.link} to="/horses">Horses</NavLink>
                    </div>
                    <div className={styles.signout_container}>
                        <img className={styles.svg} src={signoutIcon} alt="signout icon" />
                        <button className={styles.signout} type="button" onClick={onLogout}>
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar