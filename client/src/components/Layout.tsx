import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
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