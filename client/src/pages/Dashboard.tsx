import React from 'react'
import { useAuth } from '../components/AuthProvider';

type Props = {}

const Dashboard = (props: Props) => {
  const appContext = useAuth();
  if (!appContext) return null
  const {token} = appContext

  return (
    <>
      <h2>Dashboard (Protected)</h2>

      <div>Authenticated as "{token}"</div>
    </>
  )
}

export default Dashboard