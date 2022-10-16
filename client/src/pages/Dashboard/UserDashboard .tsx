import { useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader';
import UserChart from './UserChart';
import styles from "./dashboard.module.scss"
import SalaryComp from './SalaryComp';
import PersonalComp from './PersonalComp';
import FavHorseComp from './FavHorseComp';
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosPrivate } from '../../api/axios';

export type Month = {
  substring: string
}

export type Salary = {
  count: number
  substring: string
}

const currentMonth = new Date().toISOString().slice(0, 7)

const UserDashboard = () => {
  const [personalInfo, setPersonalInfo] = useState({
    instructor_name: '',
    email: '',
    phone_number: '',
    address: '',
  });
  const [salary, setSalary] = useState(0)
  const [salaryArr, setSalaryArr] = useState<Salary[]>([])
  const [favoriteHorse, setFavoriteHorse] = useState('')
  const [chartData, setChartData] = useState({
    labels: [],
    count: []
  })
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      try {
        const personalData = await (await axiosPrivate.get("/instructors/user")).data.result
        const horsesArr = await (await axiosPrivate.get(`/instructors/favorite-horse`)).data.result.rows
        const data = await (await axiosPrivate.get(`/instructors/lessons-per-month`)).data.result.rows
        const currentSalary = data.find((obj: Salary) => obj.substring === currentMonth).count
        isMounted && setSalary(currentSalary)
        isMounted && setSalaryArr(data)
        const labelsData = data.map((obj: string) => obj.substring)
        const countData = data.map((obj: { count: any }) => obj.count)
        isMounted && setChartData({
          labels: labelsData,
          count: countData,
        })
        isMounted && setPersonalInfo(personalData)
        if (horsesArr.length > 0) {
          let max = Math.max(...horsesArr.map((horse: { count: number }) => horse.count))
          let favoriteHorse = horsesArr.find((horse: { count: string }) => horse.count === max.toString()).horse_name
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

  return (
    <>{loading ? <Loader /> :
      <section className={styles.main_content}>
        <div className={styles.upper}>
          <PersonalComp data={personalInfo} />
          <SalaryComp salaryArr={salaryArr} salary={salary} setSalary={setSalary} />
          <FavHorseComp data={favoriteHorse} />
        </div>
        <div className={styles.chart}>
          <UserChart data={chartData} />
        </div>
      </section>}
    </>
  )
}

export default UserDashboard