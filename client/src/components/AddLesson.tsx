import { getDay } from 'date-fns';
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import "react-datepicker/dist/react-datepicker.css";
import UserService from '../services/userService';
const moment = extendMoment(Moment);

type Props = {}

type Student = {
    student_id: number
    name: string
    age: number
}

type Horse = {
    horse_id: number
    name: string
    age: number
    breed: string
    assignable: boolean
}

const CustomDatePicker = (props: Props) => {
    const [day, setDay] = useState(new Date())
    const [startHour, setStartHour] = useState<Date | undefined>()
    const [endHour, setEndHour] = useState<Date | undefined>()
    const [studentInfo, setStudentInfo] = useState<Student[]>([]);
    const [horseInfo, setHorseInfo] = useState<Horse[]>([])
    const [selectedHorse, setSelectedHorse] = useState('')
    const [selectedStudent, setSelectedStudent] = useState('')
    const [excludedTimes, setExcludedTimes] = useState<string[]>([])

    useEffect(() => {
        const getData = async () => {
            const userData = await UserService.getUserBoard()
            setStudentInfo(userData.studentsInfo)
            setHorseInfo(userData.horsesInfo)
        }
        getData()
    }, [])

    useEffect(() => {
        const getData = async () => {
            const lessonsData: Date[] = await (await UserService.getLessons()).data.result.rows
            console.log(lessonsData);

            // setExcludedTimes([...excludedTimes, ...lessonsData])
        }
        getData()
    }, [excludedTimes])

    const isSaturday = (date: Date) => {
        const day = getDay(date)
        return day !== 6;
    }

    const modifyDate = (dayDate: Date, hourDate: Date) => {
        let modified = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate(), hourDate?.getHours(), hourDate?.getMinutes())
        return modified
    }

    const handleClick = () => {
        let start = modifyDate(day, startHour!)
        let end = modifyDate(day, endHour!)

        let rangeArr = []
        const range = moment.range(start, end)
        const dates = Array.from(range.by("minutes", { step: 15 }))
        for (let date of dates) {
            rangeArr.push(date.toDate().toString())
        }

        console.log(rangeArr);


        UserService.addLesson(rangeArr, Number(selectedStudent), Number(selectedHorse))
        setExcludedTimes([...excludedTimes, ...rangeArr])
    }

    return (
        <div>

            <DatePicker
                dateFormat="d/M/yyyy"
                selected={day}
                onChange={(date: Date) => setDay(date)}
                filterDate={isSaturday}
            />

            <DatePicker
                dateFormat="HH:mm"
                timeFormat='HH:mm'
                selected={startHour}
                showTimeSelect
                showTimeSelectOnly
                placeholderText='Lesson Start'
                timeIntervals={15}
                timeCaption="Time"
                onChange={(date: Date) => setStartHour(date)}
            />

            <DatePicker
                dateFormat="HH:mm"
                timeFormat='HH:mm'
                showTimeSelect
                showTimeSelectOnly
                placeholderText='Lesson End'
                timeIntervals={15}
                timeCaption="Time"
                selected={endHour}
                onChange={(date: Date) => setEndHour(date)}
            />

            <span className="content">
                <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                    <option>Pick Student</option>
                    {studentInfo.map((student: Student) => {
                        return <option key={student.student_id} value={student.student_id}>{student.name}</option>
                    }
                    )}</select>
            </span>

            <span className="content">
                <select value={selectedHorse} onChange={(e) => setSelectedHorse(e.target.value)}>
                    <option>Pick Horse</option>
                    {horseInfo.map((horse: Horse) => {
                        return <option key={horse.horse_id} value={horse.horse_id}>{horse.name}</option>
                    }
                    )}</select>
            </span>

            <button onClick={handleClick}>add</button>
        </div>
    )
}

export default CustomDatePicker