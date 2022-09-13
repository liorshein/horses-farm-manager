import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useAuth } from '../AuthProvider';
import styles from './navigation.module.scss'
const dashIcon = require("../../assets/icons/dashboard.svg").default
const scheduleIcon = require("../../assets/icons/schedule.svg").default
const manIcon = require("../../assets/icons/man.svg").default
const horseIcon = require("../../assets/icons/horse.svg").default
const signoutIcon = require("../../assets/icons/signout.svg").default

type Props = {
}

const Navigation = (props: Props) => {
  const appContext = useAuth();
  if (!appContext) return null
  const { onLogout } = appContext
  const token = new Cookies().get('token');

  return (
    <nav className={styles.navbar}>
      <div className={styles.link_container}>
        <img src={dashIcon} alt="dashboard icon" />
        <NavLink className={styles.link} to="/dashboard">Dashboard</NavLink>
      </div>
      <div className={styles.link_container}>
        <img src={scheduleIcon} alt="schedule icon" />
        <NavLink className={styles.link} to="/lessons">Schedule</NavLink>
      </div>
      <div className={styles.link_container}>
        <img src={manIcon} alt="man icon" />
        <NavLink className={styles.link} to="/students">Students</NavLink>
      </div>
      <div className={styles.link_container}>
        <img src={horseIcon} alt="horse icon" />
        <NavLink className={styles.link} to="/horses">Horses</NavLink>
      </div>


      {token && (
        <div className={styles.signout_container}>
          <img className={styles.svg} src={signoutIcon} alt="signout icon" />
          <button className={styles.signout} type="button" onClick={onLogout}>
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation