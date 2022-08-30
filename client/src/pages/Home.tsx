import React, { useState } from 'react'
import { useAuth } from '../components/AuthProvider'
import Login from '../components/Login';
import Register from '../components/Register';

type Props = {
}

const Home = (props: Props) => {
  const [switchPage, setSwitchPage] = useState("Login")
  const appContext = useAuth();
  if (!appContext) return null
  const { onLogin } = appContext

  return (
    <>
      <h2>Home (public)</h2>
      {switchPage === "Login" ? <Login switchPage={setSwitchPage}/> : <Register switchPage={setSwitchPage}/>}
    </>
  )
}

export default Home