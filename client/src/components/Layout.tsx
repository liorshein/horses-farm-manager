import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { useEffect, useState } from 'react'
import { axiosPrivate } from "../api/axios";
import "../general.scss"

const Layout = () => {

    return (
        <main className="main_container">
            <Navbar />
            <Outlet />
        </main>
    )
}

export default Layout