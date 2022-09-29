import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Loader from '../../components/Loader/Loader';
import Navigation from '../../components/Navigation/Navigation';
import Chart from './Chart';
import styles from "./dashboard.module.scss"
const logo = require("../../assets/icons/logo.svg")
const menuIcon = require("../../assets/icons/menu.svg").default

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
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(window.innerWidth)
  const [navDisplay, setNavDisplay] = useState(true)
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    if (width <= 1000) {
      setNavDisplay(false)
    } else {
      setNavDisplay(true)
    }
  },[width]);
  

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const getData = async () => {
      const personalData = await (await axiosPrivate.get("/instructors/user")).data.result
      setPersonalInfo(personalData)
      const lessons = await (await axiosPrivate.get(`/instructors/lessons-monthly`)).data.result.rows
      setMonths(lessons)
      const horsesArr = await (await axiosPrivate.get(`/instructors/favorite-horse`)).data.result.rows
      let max = Math.max(...horsesArr.map((horse: { count: number }) => horse.count))
      let favoriteHorse = horsesArr.find((horse: { count: string }) => horse.count === max.toString())
      setFavoriteHorse(favoriteHorse)
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      if (salaryMonth !== '' && salaryMonth !== "Select year & month") {
        let salary = await (await axiosPrivate.get(`/instructors/lessons-per-month`)).data.result.rows[0].count
        setSalary(salary)
      } else {
        setSalary(0)
      }
    }
    getData()
  }, [salaryMonth])

  const shiftMenuDisplay = () => {
    if (navDisplay) {
      setNavDisplay(false)
    } else {
      setNavDisplay(true)
    }
  }
  
  return (
    <> {loading ?
      <Loader /> :
      <div className={styles.main_container}>
        <div className={styles.menu_side} onClick={shiftMenuDisplay}>
          <img src={menuIcon} alt="logo" />
        </div>
        <nav className={navDisplay ? styles.navbar : styles.menu_hidden}>
          <div className={styles.menu} onClick={shiftMenuDisplay}>
            <img src={menuIcon} alt="logo" />
          </div>
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
            <div className={styles.content}>
              <h2 className={styles.title}>Personal Info</h2>
              <div className={styles.info}>Email: {personalInfo.email}</div>
              <div className={styles.info}>Address: {personalInfo.address}</div>
              <div className={styles.info}>Phone number: {personalInfo.phone_number}</div>
            </div>
            <div className={styles.content}>
              <h2 className={styles.title}>Salary</h2>
              <select className={styles.select} name="months" id="months" value={salaryMonth} onChange={(e) => setSalaryMonth(e.target.value)}>
                <option value={undefined}>Select year & month</option>
                {months?.map((month: Month) => {
                  return <option key={month.substring} value={month.substring}>{month.substring}</option>
                })}
              </select>
              <div className={styles.salary}>{salary !== 0 ? <>{salary * salaryPerHour}&#8362;</> : <></>}</div>
            </div>
            <div className={styles.content}>
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