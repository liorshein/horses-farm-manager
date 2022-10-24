import { getDay } from 'date-fns'
import { useEffect, useState } from 'react'
import { axiosPrivate } from '../../api/axios'
import { Horse } from '../../util/types'
import styles from './lessons.module.scss'

type Props = {
    setAvailableHours: (a: string[]) => void
    setSelectedHorse: (a: string) => void
    selectedHorse: string
    selectedInstructor: string
    date: Date
    setDate: React.Dispatch<React.SetStateAction<Date>>
}

const CheckHours = ({ selectedInstructor, selectedHorse, setAvailableHours, setSelectedHorse, date }: Props) => {
    const [horseInfo, setHorseInfo] = useState<Horse[]>([])

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getData = async () => {
            try {
                const horsesData = await (await axiosPrivate.get("/admin/horses-available")).data.result
                isMounted && setHorseInfo(horsesData)
            } catch (error) {
                console.error(error);
            }
        }
        getData()

        return () => {
            isMounted = false;
            controller.abort()
        }
    }, [])

    const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if (selectedHorse && selectedHorse !== "Pick Horse") {
            let dateFormat = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
            let params = new URLSearchParams({ horse_id: selectedHorse, date: dateFormat, selectedInstructor: selectedInstructor })
            const availableHours = await (await axiosPrivate.get(`/admin/lessons-available?${params}`)).data.filteredResults
            setAvailableHours(availableHours);
        } else {
            alert("Please select horse and date!")
        }
    }

    return (
        <div className={styles.first_phase}>
            <div className={styles.select}>
                <div>
                    <select value={selectedHorse} onChange={(e) => {
                        setSelectedHorse(e.target.value)
                        setAvailableHours([]);
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

export default CheckHours