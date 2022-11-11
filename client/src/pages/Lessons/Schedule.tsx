import FullCalendar, {
    DateSelectArg,
    EventClickArg,
    EventSourceFunc,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useMemo, useRef, useState } from "react";
import FormRefactor from "./FormRefactor";
import { getLessons } from "../../api/lessons";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";

let baseURL: string;

export type Lesson = {
    start_time: Date;
    end_time: Date;
    student_id: number;
    horse_id: number;
    instructor_id: number;
    arrived: boolean | null;
    student_name?: string;
};

if (process.env.NODE_ENV === "production") {
    baseURL = "/api";
} else {
    baseURL = "http://localhost:3500/api";
}

type Props = {};

const Schedule = () => {
    const { instructor } = useParams();
    const [events, setEvents] = useState<Lesson[]>([]);
    const [start, setStart] = useState<Date>();
    const [end, setEnd] = useState<Date>();
    const [formDisplay, setFormDisplay] = useState(false);
    
    const getEvents = async (dateInfo: { start: Date; end: Date }) => {
        const results = await getLessons(
            dateInfo.start.toISOString(),
            dateInfo.end.toISOString(),
            instructor
        );
        let events = results.map((eventEl: Lesson) => ({
            student_id: eventEl.student_id,
            start: eventEl.start_time,
            end: eventEl.end_time,
        }));
        return events;
    };

    const handleSelectClick = (arg: DateSelectArg) => {
        const { start, end } = arg;
        setStart(start);
        setEnd(end);
        setFormDisplay(!formDisplay);
    };

    const handleEventClick = (arg: EventClickArg) => {
        console.log(arg.el);
    };

    return (
        <div className="relative ml-64 overflow-auto no-scrollbar w-full">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                initialView="dayGridMonth"
                initialEvents={getEvents}
                editable={true}
                dayMaxEvents={true}
                displayEventTime={false}
                selectable={true}
                eventClick={handleEventClick}
                select={handleSelectClick}
                eventContent={renderEventContent}
            />
            {formDisplay ? (
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 bg-white z-[99999]">
                    <FormRefactor
                        start={start}
                        end={end}
                        setStart={setStart}
                        setEnd={setEnd}
                        selectedInstructor={instructor as string}
                        setEvents={setEvents}
                        events={events}
                    />
                </div>
            ) : null}
            <Link
                className="fixed bottom-3 ml-2 z-[99999] text-2xl"
                to="/lessons"
            >
                <BsArrowLeftCircleFill />
            </Link>
        </div>
    );
};

function renderEventContent(eventInfo: any) {
    return (
        <>
            <div>{eventInfo.event.extendedProps.student_id}</div>
        </>
    );
}

export default Schedule;
