import { getDay } from 'date-fns'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import styles from './lessons.module.scss'

type Props = {
    setAvailableHours: (a: string[]) => void
    setSelectedHorse: (a: string) => void
    selectedHorse: string
    day: Date
    setDay: (a: Date) => void
}

type Horse = {
    horse_id: number
    horse_name: string
    age: number
    breed: string
    assignable: boolean
}

const SearchTime = (props: Props) => {
    const [horseInfo, setHorseInfo] = useState<Horse[]>([])

    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const getData = async () => {
            const horsesData = await (await axiosPrivate.get("/instructors/horses-available")).data.result
            setHorseInfo(horsesData)
        }
        getData()
    }, [])

    const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if (props.selectedHorse && props.day !== undefined && props.selectedHorse !== "Pick Horse") {
            let dateFormat = props.day.toISOString().split("T")[0];
            let params = new URLSearchParams({ horse_id: props.selectedHorse, date: dateFormat })
            const availableHours = await (await axiosPrivate.get(`/instructors/lessons-available?${params}`)).data.filteredResults
            props.setAvailableHours(availableHours);
        } else {
            alert("Please select horse and date!")
        }
    }

    return (
        <div className={styles.first_phase}>
            <div className={styles.date}>
                <DatePicker
                    dateFormat="d/M/yyyy"
                    selected={props.day}
                    onChange={(date: Date) => {
                        props.setDay(date);
                        props.setAvailableHours([]);
                    }}
                    filterDate={isSaturday}
                />
            </div>
            <div className={styles.select}>
                <div>
                    <select value={props.selectedHorse} onChange={(e) => {
                        props.setSelectedHorse(e.target.value)
                        props.setAvailableHours([]);
                    }}>
                        <option>Pick Horse</option>
                        {horseInfo.map((horse: Horse) => {
                            return <option key={horse.horse_id} value={horse.horse_id}>{horse.horse_name}</option>
                        }
                        )}
                    </select>
                </div>
            </div>
            <div className={styles.check}>
                <button onClick={handleClick}>Check Available Hours</button>
            </div>
        </div>
    )
}

export const isSaturday = (date: Date) => {
    const day = getDay(date)
    return day !== 6;
}

export default SearchTime