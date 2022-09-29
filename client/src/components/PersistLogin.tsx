import { useState, useEffect } from "react"
import useRefreshToken from '../hooks/useRefreshToken'
import useAuth from '../hooks/useAuth'
import Loader from "./Loader/Loader"
import { Outlet } from "react-router-dom"

type Props = {
}

const PersistLogin = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const refresh = useRefreshToken()!
  const { token } = useAuth()!

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false)
      }
    }

    !token ? verifyRefreshToken() : setIsLoading(false)

  }, [])


  return (
    <>
      {isLoading ? <Loader /> : <Outlet />}
    </>
  )
}

export default PersistLogin