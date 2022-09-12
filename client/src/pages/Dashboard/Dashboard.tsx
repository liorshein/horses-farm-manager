import { useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader';
import Navigation from '../../components/Navigation/Navigation';
import UserService from '../../services/userService';
import Chart from './Chart';
import styles from "./dashboard.module.scss"
const logo = require("../../assets/icons/logo.svg")

// TODO (1): Decide what to show on dashboard page (number of lessons today, number of lessons monthly, salary...)
// TODO (2): Create this features on server and client sides
// TODO (3): Style page

const salaryPerHour: number = 75;

type Month = {
  substring: string
}

const today = new Date().toISOString().slice(0, 7)

const Dashboard = () => {
  const [personalInfo, setPersonalInfo] = useState({
    instructor_name: '',
    email: '',
    phone_number: '',
    address: '',
  });
  const [months, setMonths] = useState<Month[]>()
  const [salaryMonth, setSalaryMonth] = useState(today)
  const [salary, setSalary] = useState(0)
  const [favoriteHorse, setFavoriteHorse] = useState<any>()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const getData = async () => {
      const personalData = await UserService.getPersonalInfo()
      setPersonalInfo(personalData)
      const lessons = await (await UserService.getMonthOfLessons())
      setMonths(lessons)
      const horsesArr = await (await UserService.getFavoriteHouse()).data.result.rows
      let max = Math.max(...horsesArr.map((horse: { count: number; }) => horse.count))
      let favoriteHorse = horsesArr.find((horse: { count: number; }) => horse.count == max)
      setFavoriteHorse(favoriteHorse)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      if (salaryMonth !== '' && salaryMonth !== "Select year & month") {
        let salary = (await UserService.getSalaryPerMonth(salaryMonth))
        setSalary(salary)
      } else {
        setSalary(0)
      }
    }
    getData()
  }, [salaryMonth])

  return (
    <> {loading ?
      <Loader /> :
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
          <div className={styles.upper}>
            <div className={styles.div3}>
              <h2 className={styles.title}>Personal Info</h2>
              <div className={styles.info}>Email: {personalInfo.email}</div>
              <div className={styles.info}>Address: {personalInfo.address}</div>
              <div className={styles.info}>Phone number: {personalInfo.phone_number}</div>
            </div>
            <div className={styles.div3}>
              <h2 className={styles.title}>Salary</h2>
              <select className={styles.select} name="months" id="months" value={salaryMonth} onChange={(e) => setSalaryMonth(e.target.value)}>
                <option value={undefined}>Select year & month</option>
                {months?.map((month: Month) => {
                  return <option key={month.substring} value={month.substring}>{month.substring}</option>
                })}
              </select>
              <div className={styles.salary}>{salary !== 0 ? <>{salary * salaryPerHour}&#8362;</> : <></>}</div>
            </div>
            <div className={styles.div3}>
              <h2 className={styles.title}>Favorite Horse</h2>
              <h3 className={styles.favorite}>{favoriteHorse ? favoriteHorse.horse_name : ''}</h3>
            </div>
          </div>
          <div className={styles.chart}>
            <Chart />
          </div>
        </section>
      </div>}
    </>
  )
}

export default Dashboard