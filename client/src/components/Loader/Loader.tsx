import styles from "./loader.module.scss"

type Props = {}

const Loader = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.loader_container}>
        <div className={styles.spinner}></div>
      </div>
    </div>
  )
}

export default Loader