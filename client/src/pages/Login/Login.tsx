import { useState } from 'react'
import { useAuth } from '../../components/AuthProvider'
import Login from '../../components/LoginComp';
import Register from '../../components/Register';
import "./login.scss"

type Props = {
}

const Home = (_props: Props) => {
  const [switchPage, setSwitchPage] = useState("Login")
  const appContext = useAuth();
  if (!appContext) return null

  return (
    <div className="container">
      <div className="banner"></div>
      <div className="form">
        {switchPage === "Login" ? <Login switchPage={setSwitchPage} /> : <Register switchPage={setSwitchPage} />}
      </div>
    </div>
  )
}

export default Home