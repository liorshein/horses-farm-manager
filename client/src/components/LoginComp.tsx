import { useAuth } from './AuthProvider';

type Props = {
  switchPage: (a: string) => void
}

const Login = (props: Props) => {

  const appContext = useAuth();
  if (!appContext) return null
  const { onLogin, loginValues, onChange } = appContext

  return (
    <>
      <h1 className='header'>Welcome!</h1>
      <form>
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" id="username" placeholder='Username'
            value={loginValues.username} onChange={onChange} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" id="password" placeholder='Password'
            value={loginValues.password} onChange={onChange} />
        </div>
        <button className='login-btn' onClick={onLogin}>Login</button>
        <button className='register-btn' type="button" onClick={() => props.switchPage("Register")}>Not a member? Sign In!</button>
      </form>
    </>
  )
}

export default Login