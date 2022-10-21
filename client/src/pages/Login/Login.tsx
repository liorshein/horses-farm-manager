import { useState } from 'react'
import Login from './LoginComp';
import Register from './RegisterComp';
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