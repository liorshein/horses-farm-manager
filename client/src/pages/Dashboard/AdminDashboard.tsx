import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import styles from "./dashboard.module.scss"
import AdminChart from "./AdminChart";
import { axiosPrivate } from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";

const today = new Date().toISOString().slice(0, 7)

const AdminDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [months, setMonths] = useState<string[]>([])
    const [selectedMonth, setSelectedMonth] = useState(today)
    const [chartData, setChartData] = useState({
        labels: [],
        count: []
    })

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
                const months = await (await axiosPrivate.get(`/admin/lessons-monthly`)).data.result.rows
                const monthsData = months.map((obj: any) => obj.substring)
                isMounted && setMonths(monthsData)
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

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getData = async () => {
            try {
                let params = new URLSearchParams({ date: selectedMonth })
                const data = await (await axiosPrivate.get(`/admin/instructors-lessons-per-month?${params}`)).data.result.rows
                const labelsData = data.map((obj: any) => obj.instructor_name)
                const countData = data.map((obj: any) => obj.count)
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
    }, [selectedMonth])

    return (
        <> {loading ?
            <Loader /> :

            <section className={styles.main_content}>
                <div className={styles.container2}>
                    <div className={styles.select_content}>
                        <h1>Lessons Per Instructor</h1>
                        <select className={styles.select} name="month" id="month" value={selectedMonth} onChange={(e) => { setSelectedMonth(e.target.value) }}>
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