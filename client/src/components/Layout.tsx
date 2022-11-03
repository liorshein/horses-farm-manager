import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {

    return (
        <main className="flex bg-slate-50 w-screen h-screen">
            <Navbar />
            <Outlet />
        </main>
    )
}

export default Layout