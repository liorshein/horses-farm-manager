import { getDay } from 'date-fns'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import UserService from '../services/userService'

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

    useEffect(() => {
        const getData = async () => {
            const horsesData = await UserService.getHorsesInfo()
            setHorseInfo(horsesData)
        }
        getData()
    }, [])

    const handleClick = async (e: { preventDefault: () => void }) => {   
        e.preventDefault()     
        if (props.selectedHorse && props.day !== undefined && props.selectedHorse !== "Pick Horse"){
            let dateFormat = props.day.toISOString().split("T")[0];            
            const availableHours = await (await UserService.getAvailableHours(props.selectedHorse, dateFormat)).data.filteredResults
            props.setAvailableHours(availableHours);
        } else {
            alert("Please select horse and date!")
        }
    }

    return (
        <>
            <DatePicker
                dateFormat="d/M/yyyy"
                selected={props.day}
                onChange={(date: Date) => props.setDay(date)}
                filterDate={isSaturday}
            />

            <div className="content">
                <select value={props.selectedHorse} onChange={(e) => props.setSelectedHorse(e.target.value)}>
                    <option>Pick Horse</option>
                    {horseInfo.map((horse: Horse) => {
                        return <option key={horse.horse_id} value={horse.horse_id}>{horse.horse_name}</option>
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