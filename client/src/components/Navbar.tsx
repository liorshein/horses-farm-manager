import { NavLink } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState } from "react"
const avatar = require("../assets/icons/avatar.svg").default
const dashIcon = require("../assets/icons/dashboard.svg").default
const scheduleIcon = require("../assets/icons/schedule.svg").default
const manIcon = require("../assets/icons/man.svg").default
const horseIcon = require("../assets/icons/horse.svg").default
const signoutIcon = require("../assets/icons/signout.svg").default

const Navbar = () => {
    const { onLogout, roles, name } = useAuth()!
    const [menuActive, setMenuActive] = useState(true)
    const [logoutMenuActive, setLogoutMenuActive] = useState(false)

    const handleActiveMenu = () => {
        setMenuActive(!menuActive)
    }

    const handleActiveLogout = () => {
        setLogoutMenuActive(!logoutMenuActive)
    }

    return (
        <>
            <button onClick={handleActiveMenu} className={`absolute top-4 sm:hidden left-4 text-2xl ${menuActive ? '' : 'hidden'}`}>
                <GiHamburgerMenu />
            </button>
            <div className={`z-50 h-screen overflow-hidden w-0 opacity-0 shadow-xl sm:w-64 sm:opacity-100 transition-all ${menuActive ? '' : 'w-64 opacity-100'}`}>
                <div className="flex justify-between items-center h-14 w-full border-b-black border-b">
                    <div className="h-full flex justify-start items-center ml-4">
                        <img className="w-8" src={horseIcon} alt="horse icon" />
                        <p className="ml-4 text-2xl font-bold tracking-tight pt-1">Lior's Farm</p>
                    </div>
                    <button className="mr-2 text-xl sm:hidden" onClick={handleActiveMenu}>
                        <AiOutlineCloseCircle />
                    </button>
                </div>
                <ul className="ml-5 mt-10">
                    <li className="flex mb-8">
                        <img src={dashIcon} alt="dashboard icon" />
                        <NavLink className="ml-4 uppercase" to="/dashboard">dashboard</NavLink>
                    </li>
                    <li className="flex mb-8">
                        <img src={scheduleIcon} alt="schedule icon" />
                        <NavLink className="ml-4 uppercase" to="/dashboard">schedule</NavLink>
                    </li>
                    <li className="flex mb-8">
                        <img src={manIcon} alt="man icon" />
                        <NavLink className="ml-4 uppercase" to="/dashboard">students</NavLink>
                    </li>
                    <li className="flex mb-8">
                        <img src={horseIcon} alt="horse icon" />
                        <NavLink className="ml-4 uppercase" to="/dashboard">horses</NavLink>
                    </li>
                </ul>
                <div className="absolute bottom-0 w-64 h-14 border-t-black border-t">
                    <div className="h-full flex justify-start items-center ml-2">
                        <button onClick={handleActiveLogout}>
                            <img src={avatar} className="h-10 w-10 rounded-full" alt="avatar" />
                        </button>
                        <p className="text-md font-bold ml-2">Hello, {name}</p>
                        <div className={`absolute bottom-14 shadow-md bg-slate-100 w-2/5 ${logoutMenuActive ? 'block' : 'hidden'}`}>
                            <button className="flex items-center ml-2 border-t-black" onClick={onLogout}>
                                <img className="w-5 rotate-180" src={signoutIcon} alt="signout icon" />
                                <p className="ml-1 text-lg font-bold tracking-tight pt-1">Logout</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
    // return (
    //     <>
    //         <div className={styles.flex_col}>
    //             <div className={styles.navbar}>
    //                 <div className={styles.logo}>
    //                     <img src={logo} alt="logo" />
    //                 </div>
    //                 <div className={styles.personal_info_nav}>
    //                     <h1 className={styles.name}>{name.split(' ')[0]} <br /> {name.split(' ')[1]}</h1>
    //                     <p className={styles.job}>{roles[0] === "User" ? <>Instructor</> : <></>}</p>
    //                 </div>
    //             </div>
    //             <div className={styles.navbar_links}>
    //                 <div className={styles.link_container}>
    //                     <img src={dashIcon} alt="dashboard icon" />
    //                     <NavLink className={styles.link} to="/dashboard">Dashboard</NavLink>
    //                 </div>
    //                 <div className={styles.link_container}>
    //                     <img src={scheduleIcon} alt="schedule icon" />
    //                     <NavLink className={styles.link} to="/lessons">Schedule</NavLink>
    //                 </div>
    //                 <div className={styles.link_container}>
    //                     <img src={manIcon} alt="man icon" />
    //                     <NavLink className={styles.link} to="/students">Students</NavLink>
    //                 </div>
    //                 <div className={styles.link_container}>
    //                     <img src={horseIcon} alt="horse icon" />
    //                     <NavLink className={styles.link} to="/horses">Horses</NavLink>
    //                 </div>
    //                 <div className={styles.signout_container}>
    //                     <img className={styles.svg} src={signoutIcon} alt="signout icon" />
    //                     <button className={styles.signout} type="button" onClick={onLogout}>
    //                         Sign Out
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // )
}

export default Navbar