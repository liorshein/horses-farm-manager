import { useAuth } from './AuthProvider';
import styles from "../pages/Login/loginComp.module.scss"

type Props = {
  switchPage: (a: string) => void
}

const Login = (props: Props) => {

  const appContext = useAuth();
  if (!appContext) return null
  const { onLogin, loginValues, onChange } = appContext

  return (
    <>
      <h1 className={styles.header}>Welcome!</h1>
      <form autoComplete="off">
        <div className={styles.form_group}>
          <label>Username</label>
          <input type="text" name="username" id="username" placeholder='Username'
            value={loginValues.username} onChange={onChange} />
        </div>
        <div className={styles.form_group}>
          <label>Password</label>
          <input type="password" name="password" id="password" placeholder='Password'
            value={loginValues.password} onChange={onChange} />
        </div>
        <button className={styles.login_btn} onClick={onLogin}>Login</button>
        <button className={styles.register_btn} type="button" onClick={() => props.switchPage("Register")}>Not a member? Sign In!</button>
      </form>
    </>
  )
}

export default Login