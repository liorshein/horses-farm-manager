import FullCalendar, {
    DateSelectArg,
    EventClickArg,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { EventDragStartArg, EventDragStopArg } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import FormRefactor from "./FormRefactor";
import { editLesson, getLessons } from "../../api/lessons";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { axiosPrivate } from "../../api/axios";
import { Horse, Student } from "../../util/types";

let baseURL: string;

export type Lesson = {
    lesson_id?: number;
    start_time?: Date;
    start?: Date;
    end_time?: Date;
    end?: Date;
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


const Schedule = () => {
    const { instructor } = useParams();
    const [events, setEvents] = useState<Lesson[]>([]);
    const [studentInfo, setStudentInfo] = useState<Student[]>([]);
    const [horseInfo, setHorseInfo] = useState<Horse[]>([]);
    const [start, setStart] = useState<Date>();
    const [end, setEnd] = useState<Date>();
    const [formDisplay, setFormDisplay] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getData = async () => {
            try {
                if (instructor !== "") {
                    let params = new URLSearchParams({
                        instructor_id: instructor as string,
                    });
                    const studentsData = await (
                        await axiosPrivate.get(
                            `/admin/instructor-students?${params}`
                        )
                    ).data.result;
                    const horsesData = await (
                        await axiosPrivate.get("/admin/horses-available")
                    ).data.result;
                    isMounted && setHorseInfo(horsesData);
                    isMounted && setStudentInfo(studentsData);
                }
            } catch (error) {
                console.error(error);
            }
        };
        getData();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    const getEvents = async (dateInfo: { start: Date; end: Date }) => {
        const results = await getLessons(
            dateInfo.start.toISOString(),
            dateInfo.end.toISOString(),
            instructor
        );

        const events = results.map((eventEl: Lesson) => ({
            lesson_id: eventEl.lesson_id,
            student_name: eventEl.student_name,
            start: eventEl.start_time,
            end: eventEl.end_time,
        }));
        setEvents(events);
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

    const handleEventEdit = async (arg: EventDragStopArg) => {        
        try {
            await editLesson(arg.event.extendedProps.lesson_id, arg.event.start, arg.event.end)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="relative sm:ml-64 overflow-auto no-scrollbar w-full h-full sm:mt-0 mt-10">
            <FullCalendar
                height="100%"
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                initialView="dayGridMonth"
                initialEvents={getEvents}
                editable={true}
                events={events}
                dayMaxEvents={true}
                displayEventTime={false}
                selectable={true}
                eventClick={handleEventClick}
                select={handleSelectClick}
                eventContent={renderEventContent}
                eventDrop={handleEventEdit}
                eventResize={handleEventEdit}
            />
            {formDisplay ? (
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 bg-white z-[99999]">
                    <FormRefactor
                        start={start}
                        end={end}
                        setStart={setStart}
                        setEnd={setEnd}
                        instructor={instructor as string}
                        setEvents={setEvents}
                        events={events}
                        studentInfo={studentInfo}
                        horseInfo={horseInfo}
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
            <div className="bg-blue-400 w-full h-full rounded-md whitespace-normal">
                {eventInfo.event.extendedProps.student_name}
            </div>
        </>
    );
}

export default Schedule;
