import { SetStateAction, useEffect, useState } from "react"
import { LessonsData } from "../../util/types"
import styles from "./dashboard.module.scss"

type Props = {
    dashboardData: LessonsData[]
    setSelectedMonth: React.Dispatch<SetStateAction<string>>
    selectedMonth: string
}

const SelectMonthComp = ({ dashboardData, setSelectedMonth, selectedMonth }: Props) => {
    const [months, setMonths] = useState<string[]>([])

    useEffect(() => {
        const getData = async () => {
            const monthsData: string[] = dashboardData.map((obj: any) => obj.substring)
            const months = [...new Set(monthsData)]
            setMonths(months)
        }
        getData()
    }, [])

    return (
        <div className={styles.select_content}>
            <h1>Lessons Per Instructor</h1>
            <select className={styles.select} name="month" id="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                <option value="">Choose Month</option>
                {months.map((month: string) => {
                    return <option key={month} value={month}>{month}</option>
                })}
            </select>
        </div>
    )
}

export default SelectMonthComp