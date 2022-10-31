import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {

    return (
        <main className="flex bg-slate-50">
            <Navbar />
            <Outlet />
        </main>
    )
}

export default Layout