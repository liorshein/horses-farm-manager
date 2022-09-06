import { useState } from 'react'
import Login from '../../components/LoginComp';
import Register from '../../components/Register';
import styles from "./login.module.scss"

// TODO (1): Style page better

type Props = {
}

const Home = (_props: Props) => {
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