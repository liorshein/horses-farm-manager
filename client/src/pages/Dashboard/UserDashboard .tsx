import { useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader';
import UserChart from './UserChart';
import styles from "./dashboard.module.scss"
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../../api/axios';

const salaryPerHour: number = 75;

type Month = {
  substring: string
}

const today = new Date().toISOString().slice(0, 7)

const UserDashboard = () => {
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
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      try {
        const personalData = await (await axiosPrivate.get("/instructors/user")).data.result
        isMounted && setPersonalInfo(personalData)
        const lessons = await (await axiosPrivate.get(`/instructors/lessons-monthly`)).data.result.rows
        isMounted && setMonths(lessons)
        const horsesArr = await (await axiosPrivate.get(`/instructors/favorite-horse`)).data.result.rows
        if (horsesArr.length > 0) {
          let max = Math.max(...horsesArr.map((horse: { count: number }) => horse.count))
          let favoriteHorse = horsesArr.find((horse: { count: string }) => horse.count === max.toString())
          isMounted && setFavoriteHorse(favoriteHorse)
        }
      } catch (err) {
        navigate('/login', { state: { from: location }, replace: true })
      }
    }
    getData()

    return () => {
      isMounted = false;
      controller.abort()
    }

  }, [])

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      try {
        if (salaryMonth !== '' && salaryMonth !== "Select year & month") {
          let salary = await (await axiosPrivate.get(`/instructors/lessons-per-month`)).data.result.rows[0]
          if (salary !== undefined) {
            isMounted && setSalary(salary.count)
          }
        } else {
          isMounted && setSalary(0)
        }
      } catch (error) {
        console.error(error);
      }
    }
    getData()

    return () => {
      isMounted = false;
      controller.abort()
    }
  }, [salaryMonth])

  return (
    <> {loading ?
      <Loader /> :

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
            <div className={styles.salary}><>{salary * salaryPerHour}&#8362;</></div>
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>Favorite Horse</h2>
            <h3 className={styles.favorite}>{favoriteHorse ? favoriteHorse.horse_name : ''}</h3>
          </div>
        </div>
        <div className={styles.chart}>
          <UserChart />
        </div>
      </section>
    }
    </>
  )
}

export default UserDashboard