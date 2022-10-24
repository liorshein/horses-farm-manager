import { useState } from "react";
import styles from "./dashboard.module.scss"
import AdminChart from "./AdminChart";
import { LessonsData } from "../../util/types";
import SelectMonthComp from "./SelectMonthComp";

type Props = {
    dashboardData: LessonsData[]
}

const currentMonth = new Date().toISOString().slice(0, 7)

const AdminDashboard = ({ dashboardData }: Props) => {    
    const [selectedMonth, setSelectedMonth] = useState(currentMonth)  

    return (
        <section className={styles.main_content}>
            <div className={styles.container2}>
                <SelectMonthComp dashboardData={dashboardData} setSelectedMonth={setSelectedMonth} selectedMonth={selectedMonth}/>
                <div className={styles.chart2}>
                    <AdminChart dashboardData={dashboardData} selectedMonth={selectedMonth}/>
                </div>
            </div>
        </section>
    )
}

export default AdminDashboard