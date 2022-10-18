import { Link } from "react-router-dom"
import styles from "./forbidden.module.scss"

type Props = {}

const Forbidden = (props: Props) => {
  return (
    <section className={styles.page_404}>
      <div className={styles.gif}></div>
      <h1 className={styles.header}>403</h1>
      <h3 className={styles.text}>Hold your horses</h3>
      <h3 className={styles.text}>the page you wanted is restricted!</h3>
      <Link className={styles.link} to={"/login"}>Please login</Link>
      <div className={styles.gif}></div>
    </section >
  )
}

export default Forbidden