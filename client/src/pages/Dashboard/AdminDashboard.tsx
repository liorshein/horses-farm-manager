import { SetStateAction, useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import styles from "./dashboard.module.scss"
import AdminChart from "./AdminChart";
import { axiosPrivate } from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ChartData, LessonsData } from "../../util/types";

const currentMonth = new Date().toISOString().slice(0, 7)

const AdminDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [months, setMonths] = useState<string[]>([])
    const [selectedMonth, setSelectedMonth] = useState(currentMonth)
    const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        count: []
    })
    const [lessonsData, setLessonsData] = useState<LessonsData[]>([])

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
                const data = await (await axiosPrivate.get(`/admin/instructors-lessons-per-month`)).data.result.rows
                const monthsData: string[] = data.map((obj: any) => obj.substring)
                const months = [...new Set(monthsData)]
                isMounted && setMonths(months)
                isMounted && setLessonsData(data)
                const currentMonthData = data.filter((obj: any) => obj.substring === currentMonth)
                const labelsData = currentMonthData.map((obj: any) => obj.instructor_name)
                const countData = currentMonthData.map((obj: any) => obj.count)
                isMounted && setChartData({
                    labels: labelsData,
                    count: countData,
                })
            } catch (error) {
                navigate('/login', { state: { from: location }, replace: true })
            }
        }
        getData()

        return () => {
            isMounted = false;
            controller.abort()
        }
    }, [])

    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedMonth(e.target.value)
        const currentMonthData = lessonsData.filter((obj: any) => obj.substring === e.target.value)
        const labelsData = currentMonthData.map((obj: any) => obj.instructor_name)
        const countData = currentMonthData.map((obj: any) => obj.count)
        setChartData({
            labels: labelsData,
            count: countData,
        })
    }

    return (
        <> {loading ?
            <Loader /> :

            <section className={styles.main_content}>
                <div className={styles.container2}>
                    <div className={styles.select_content}>
                        <h1>Lessons Per Instructor</h1>
                        <select className={styles.select} name="month" id="month" value={selectedMonth} onChange={handleChange}>
                            <option value="">Choose Month</option>
                            {months.map((month: string) => {
                                return <option key={month} value={month}>{month}</option>
                            })}
                        </select>
                    </div>
                    <div className={styles.chart2}>
                        <AdminChart chartData={chartData} />
                    </div>
                </div>
            </section>
        }
        </>
    )
}

export default AdminDashboard