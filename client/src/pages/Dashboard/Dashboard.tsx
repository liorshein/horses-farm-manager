import { useEffect, useState } from 'react'
import Navigation from '../../components/Navigation/Navigation';
import UserService from '../../services/userService';
import styles from "./dashboard.module.scss"
const logo = require("../../assets/icons/logo.svg")

// TODO (1): Decide what to show on dashboard page (number of lessons today, number of lessons monthly, salary...)
// TODO (2): Create this features on server and client sides
// TODO (3): Style page

const Dashboard = () => {
  const [personalInfo, setPersonalInfo] = useState({
    instructor_name: '',
    email: '',
    phone_number: '',
    address: '',
  });

  useEffect(() => {
    const getData = async () => {
      const personalData = await UserService.getPersonalInfo()
      setPersonalInfo(personalData)
    }
    getData()
  }, [])

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src={logo.default} alt="logo" />
        </div>
        <div className={styles.personal_info_nav}>
          <h1 className={styles.name}>{personalInfo.instructor_name.split(' ')[0]} <br /> {personalInfo.instructor_name.split(' ')[1]}</h1>
          <p className={styles.job}>Instructor</p>
        </div>
        <div className={styles.links}>
          <Navigation />
        </div>
      </nav>

      <section className={styles.main_content}>
        <div className={styles.div1}>
          <h2>Personal Info</h2>
        </div>
        <div className={styles.div2}>
          <div className={styles.div3}>
            <h2>Salary</h2>
          </div>
          <div className={styles.div3}>
            <h2>Favorite Horse</h2>
          </div>
        </div>
        <div className={styles.div4}>
          <h2>Lessons Per Month</h2>
        </div>
      </section>
    </div>
  )
}

export default Dashboard