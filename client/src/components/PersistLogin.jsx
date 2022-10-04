import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { axiosPrivate } from '../api/axios'
import useAuth from '../hooks/useAuth'
import Loader from './Loader/Loader'

const PersistLogin = () => {
    const { setRoles } = useAuth()
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        const checkLoggedIn = async () => {
            const response = await axiosPrivate.get("/auth/re-login")
            if (response.status === 200) {
                setRoles(response.data)
                setLoggedIn(true)
            } else {
                setLoggedIn(false)
            }
        }
        checkLoggedIn()
    }, [])

    console.log(loggedIn);

    return (
        <>
            {loggedIn ? <Outlet /> : <Loader />}
        </>
    )
}

export default PersistLogin