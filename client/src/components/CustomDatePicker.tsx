import { getDay } from 'date-fns';
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

type Props = {
    setNewLesson: (a: {
        day: Date
        start: string
        end: string
    }) => void
}

function hourMinFormat(time: Date) {
    let dateStr = time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return dateStr
}

const CustomDatePicker = (props: Props) => {
    const [day, setDay] = useState(new Date())
    const [startHour, SetStartHour] = useState(new Date())
    const [endHour, SetEndHour] = useState(new Date())

    const isSaturday = (date: Date) => {
        const day = getDay(date)
        return day !== 6;
    }

    const handleClick = () => {
        props.setNewLesson({
            day: day,
            start: hourMinFormat(startHour),
            end: hourMinFormat(endHour),
        })
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
                timeIntervals={15}
                timeCaption="Time"
                onChange={(date: Date) => SetStartHour(date)}
            />

            <DatePicker
                dateFormat="HH:mm"
                timeFormat='HH:mm'
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                selected={endHour}
                onChange={(date: Date) => SetEndHour(date)}
            />
            <button onClick={handleClick}>add</button>
        </div>
    )
}

export default CustomDatePicker