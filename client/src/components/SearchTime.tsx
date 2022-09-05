import { getDay } from 'date-fns'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import UserService from '../services/userService'

type Props = {
    setAvailableHours: (a: string[]) => void
}

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
    const [selectedHorseId, setSelectedHorseId] = useState('')

    useEffect(() => {
        const getData = async () => {
            const userData = await UserService.getUserBoard()
            setHorseInfo(userData.horsesInfo)
        }
        getData()
    }, [])

    const handleClick = async () => {        
        if (selectedHorseId && day !== undefined && selectedHorseId !== "Pick Horse"){
            let dateFormat = day.toISOString().split("T")[0] + " 00:00:00+00"            
            const availableHours = await (await UserService.getLessons(selectedHorseId, dateFormat)).data.filteredResults
            props.setAvailableHours(availableHours);
        } else {
            alert("Please select horse and date!")
        }
    }

    return (
        <>
            <DatePicker
                dateFormat="d/M/yyyy"
                selected={day}
                onChange={(date: Date) => setDay(date)}
                filterDate={isSaturday}
            />

            <div className="content">
                <select value={selectedHorseId} onChange={(e) => setSelectedHorseId(e.target.value)}>
                    <option>Pick Horse</option>
                    {horseInfo.map((horse: Horse) => {
                        return <option key={horse.horse_id} value={horse.horse_id}>{horse.name}</option>
                    }
                    )}</select>
            </div>

            <button onClick={handleClick}>Check Available Hours</button>
        </>
    )
}

const isSaturday = (date: Date) => {
    const day = getDay(date)
    return day !== 6;
}

export default SearchTime