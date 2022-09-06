import { NavLink } from 'react-router-dom';
import { useAuth } from './AuthProvider';

type Props = {
}

const Navigation = (props: Props) => {
  const appContext = useAuth();
  if (!appContext) return null
  const { token, onLogout } = appContext

  return (
    <nav>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/students">Students</NavLink>
      <NavLink to="/horses">Horses</NavLink>
      <NavLink to="/lessons">Lessons</NavLink>

      {token && (
        <button type="button" onClick={onLogout}>
          Sign Out
        </button>
      )}
    </nav>
  );
};

export default Navigation