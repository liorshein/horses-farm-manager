import { Link } from "react-router-dom"
import styles from "./nomatch.module.scss"

const NoMatch = () => {
  return (
    <section className={styles.page_404}>
      <div className={styles.gif}></div>
      <h1 className={styles.header}>404</h1>
      <h3 className={styles.text}>Hold your horses</h3>
      <h3 className={styles.text}>the page you wanted does not exist!</h3>
      <Link className={styles.link} to={"/login"}>Return to home</Link>
      <div className={styles.gif}></div>
    </section >
  )
}

export default NoMatch