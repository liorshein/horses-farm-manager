import { getDay } from 'date-fns'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import UserService from '../services/userService'

type Props = {}

type Horse = {
    horse_id: number
    name: string
    age: number
    breed: string
    assignable: boolean
}

const SearchTime = (props: Props) => {
    const [day, setDay] = useState(new Date())
    const [horseInfo, setHorseInfo] = useState<Horse[]>([])
    const [selectedHorse, setSelectedHorse] = useState('')

    useEffect(() => {
        const getData = async () => {
            const userData = await UserService.getUserBoard()
            setHorseInfo(userData.horsesInfo)
        }
        getData()
    }, [])

    useEffect(() => {
        const getData = async () => {
            const availableHours = await UserService.getWorkHours(day)
            
        }
        getData()
    }, [])

    return (
        <>
            <DatePicker
                dateFormat="d/M/yyyy"
                selected={day}
                onChange={(date: Date) => setDay(date)}
                filterDate={isSaturday}
            />

            <div className="content">
                <select value={selectedHorse} onChange={(e) => setSelectedHorse(e.target.value)}>
                    <option>Pick Horse</option>
                    {horseInfo.map((horse: Horse) => {
                        return <option key={horse.horse_id} value={horse.horse_id}>{horse.name}</option>
                    }
                    )}</select>
            </div>
        </>
    )
}

const isSaturday = (date: Date) => {
    const day = getDay(date)
    return day !== 6;
}

export default SearchTime