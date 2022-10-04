import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { axiosPrivate } from '../api/axios'
import useAuth from '../hooks/useAuth'
import Loader from './Loader/Loader'

const PersistLogin = () => {
    const { setRoles, setName } = useAuth()!
    const [loggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const response = await axiosPrivate.get("/auth/re-login")            
                if (response.status === 200) {
                    setRoles(response.data.roles)
                    setName(response.data.name)
                    setLoggedIn(true)
                } else {
                    setLoggedIn(false)
                }
            } catch (error) {
                navigate('/login', { state: { from: location }, replace: true })
            }
        }
        checkLoggedIn()
    }, [setRoles])

    return (
        <>
            {loggedIn ? <Outlet /> : <Loader />}
        </>
    )
}

export default PersistLogin