import styles from "./loader.module.scss"

type Props = {}

const Loader = (props: Props) => {
  return (
    <div className={styles.loader_container}></div>
  )
}

export default Loader