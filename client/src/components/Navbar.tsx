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
    const { onLogout, name } = useAuth()!
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
            <button onClick={handleActiveMenu} className={`absolute top-2 sm:hidden left-2 text-2xl ${menuActive ? '' : 'hidden'}`}>
                <GiHamburgerMenu />
            </button>
            <div className={`absolute bg-slate-50 z-50 h-screen overflow-hidden w-0 opacity-0 shadow-xl sm:w-64 sm:min-w-[16rem] sm:opacity-100 transition-all ${menuActive ? '' : 'w-64 opacity-100'}`}>
                <div className="flex justify-between items-center h-14 border-b-black border-b">
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
                        <NavLink className="ml-4 uppercase" to="/dashboard" onClick={handleActiveMenu}>dashboard</NavLink>
                    </li>
                    <li className="flex mb-8">
                        <img src={scheduleIcon} alt="schedule icon" />
                        <NavLink className="ml-4 uppercase" to="/lessons" onClick={handleActiveMenu}>schedule</NavLink>
                    </li>
                    <li className="flex mb-8">
                        <img src={manIcon} alt="man icon" />
                        <NavLink className="ml-4 uppercase" to="/students" onClick={handleActiveMenu}>students</NavLink>
                    </li>
                    <li className="flex mb-8">
                        <img src={horseIcon} alt="horse icon" />
                        <NavLink className="ml-4 uppercase" to="/horses" onClick={handleActiveMenu}>horses</NavLink>
                    </li>
                </ul>
                <div className="absolute bottom-0 w-64 h-14 border-t-black border-t">
                    <div className="h-full flex justify-start items-center mx-2">
                        <button onClick={handleActiveLogout}>
                            <img src={avatar} className="h-10 w-10 rounded-full" alt="avatar" />
                        </button>
                        <p className="text-md font-bold ml-2 text-ellipsis">Hello, {name}</p>
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
}

export default Navbar