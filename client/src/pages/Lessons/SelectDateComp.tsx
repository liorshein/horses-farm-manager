import { getDay } from "date-fns"
import DatePicker from 'react-datepicker'
import styles from "./lessons.module.scss"
const leftArrow = require("../../assets/icons/leftarrow.svg")
const rightArrow = require("../../assets/icons/rightarrow.svg")

type Props = {
    date: Date
    setDate: React.Dispatch<React.SetStateAction<Date>>
}

const SelectDateComp = ({ date, setDate }: Props) => {

    const dateRight = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        let nextDay = date.setDate(date.getDate() + 1)
        setDate(new Date(nextDay))
    }

    const dateLeft = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        let prevDay = date.setDate(date.getDate() - 1)
        setDate(new Date(prevDay))
    }
    
    return (
        <div className={styles.date_container}>
            <button onClick={dateLeft} className={styles.arrowBtn}><img className={styles.arrow} src={leftArrow.default} alt="logo" /></button>
            <div>
                <DatePicker
                    dateFormat="d/M/yyyy"
                    selected={date}
                    onChange={(date: Date) => setDate(date)}
                    filterDate={isSaturday}
                />
            </div>
            <button onClick={dateRight} className={styles.arrowBtn}><img className={styles.arrow} src={rightArrow.default} alt="logo" /></button>
        </div>
    )
}

export const isSaturday = (date: Date) => {
    const day = getDay(date)
    return day !== 6;
}

export default SelectDateComp