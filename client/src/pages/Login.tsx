import React, { useState } from 'react'
import { useAuth } from '../components/AuthProvider';

type Props = {
  switchPage: (a: string) => void
}

const Login = (props: Props) => {
  
  const appContext = useAuth();
  if (!appContext) return null
  const { onLogin, loginValues, onChange } = appContext

  return (
    <>
      <h1>Login</h1>
      <form>
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" id="username" value={loginValues.username} onChange={onChange}/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" id="password" value={loginValues.password} onChange={onChange}/>
        </div>
        <button onClick={onLogin}>Sign In</button>
        <button onClick={() => props.switchPage("Register")}>Register</button>
      </form>
    </>
  )
}

export default Login