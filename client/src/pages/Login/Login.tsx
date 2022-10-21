import { useState } from 'react'
import Login from '../../components/Login';
import Register from '../../components/Register';
import styles from "./login.module.scss"

const Home = () => {
  const [switchPage, setSwitchPage] = useState("Login")

  return (
    <div className={styles.container}>
      <div className={styles.banner}></div>
      <div className={styles.form}>
        {switchPage === "Login" ? <Login switchPage={setSwitchPage} /> : <Register switchPage={setSwitchPage} />}
      </div>
    </div>
  )
}

export default Home