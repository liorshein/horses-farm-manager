import { useEffect, useState } from "react";
import { Salary, Month } from "../../util/types";
import styles from "./dashboard.module.scss"

type Props = {
    salaryArr: Salary[]
}

const currentMonth = new Date().toISOString().slice(0, 7)
const salaryPerHour: number = 75;

const SalaryComp = ({ salaryArr }: Props) => {
    const [salaryMonth, setSalaryMonth] = useState(currentMonth)
    const [salary, setSalary] = useState(0)

    useEffect(() => {
        const getData = async () => {
            const currentSalary = salaryArr.find((obj: Salary) => obj.substring === salaryMonth)?.count
            currentSalary && setSalary(currentSalary)
        }
        getData()
    }, [salaryMonth])

    return (
        <div className={styles.content}>
            <h2 className={styles.title}>Salary</h2>
            <select className={styles.select} name="months" id="months" value={salaryMonth} onChange={(e) => setSalaryMonth(e.target.value)}>
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