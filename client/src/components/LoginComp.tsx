import useAuth from "../hooks/useAuth"
import styles from "../pages/Login/loginComp.module.scss"

type Props = {
  switchPage: (a: string) => void
}

const Login = (props: Props) => {

  const { onLogin, loginValues, onChange } = useAuth()!

  return (
    <>
      <h1 className={styles.header}>Welcome!</h1>
      <form autoComplete="off">
        <div className={styles.form_group}>
          <label>Email</label>
          <input type="text" name="email" id="email" placeholder='Email' autoComplete='email'
            value={loginValues.email} onChange={onChange} />
        </div>
        <div className={styles.form_group}>
          <label>Password</label>
          <input type="password" name="password" id="password" placeholder='Password' autoComplete='current-password'
            value={loginValues.password} onChange={onChange} />
        </div>
        <button className={styles.login_btn} onClick={onLogin}>Login</button>
        <button className={styles.register_btn} type="button" onClick={() => props.switchPage("Register")}>Not a member? Sign In!</button>
      </form>
    </>
  )
}

export default Login