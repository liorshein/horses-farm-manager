import { useState } from "react";
import styles from "./dashboard.module.scss"
import { Month, Salary } from "./UserDashboard ";

type Props = {
    salaryArr: Salary[]
    salary: number
    setSalary: React.Dispatch<React.SetStateAction<number>>
}

const currentMonth = new Date().toISOString().slice(0, 7)
const salaryPerHour: number = 75;

const SalaryComp = ({ salaryArr, salary, setSalary }: Props) => {
    const [salaryMonth, setSalaryMonth] = useState(currentMonth)
    
    const handleChange = (e: { target: { value: any; }; }) => {
        setSalaryMonth(e.target.value)
        const selectedMonth = salaryArr.find((obj: Salary) => obj.substring === e.target.value)
        setSalary(selectedMonth?.count!)
    }

    return (
        <div className={styles.content}>
            <h2 className={styles.title}>Salary</h2>
            <select className={styles.select} name="months" id="months" value={salaryMonth} onChange={handleChange}>
                <option value={undefined}>Select year & month</option>
                {salaryArr?.map((month: Month) => {
                    return <option key={month.substring} value={month.substring}>{month.substring}</option>
                })}
            </select>
            <div className={styles.salary}><>{salary * salaryPerHour}&#8362;</></div>
        </div>
    )
}

export default SalaryComp