import FullCalendar, {
    DateSelectArg,
    EventClickArg,
    EventDropArg,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
    EventResizeDoneArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import LessonForm from "./LessonForm";
import { editLesson, getLessons } from "../../api/lessons";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { axiosPrivate } from "../../api/axios";
import { Horse, Student } from "../../util/types";
import PopUp from "./PopUp";
import useAuth from "../../hooks/useAuth";

let baseURL: string;

export type Lesson = {
    lesson_id?: number;
    start_time?: Date;
    start?: Date;
    end_time?: Date;
    end?: Date;
    student_id?: number;
    horse_id?: number;
    horse_name?: string;
    instructor_id?: number;
    student_name?: string;
};

if (process.env.NODE_ENV === "production") {
    baseURL = "/api";
} else {
    baseURL = "http://localhost:3500/api";
}

const Schedule = () => {
    const { roles } = useAuth()!;
    const { instructor } = useParams();
    const [events, setEvents] = useState<Lesson[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Lesson>();
    const [studentInfo, setStudentInfo] = useState<Student[]>([]);
    const [horseInfo, setHorseInfo] = useState<Horse[]>([]);
    const [start, setStart] = useState<Date>();
    const [end, setEnd] = useState<Date>();
    const [formDisplay, setFormDisplay] = useState(false);
    const [popupDisplay, setPopupDisplay] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getData = async () => {
            if (roles.includes("Admin")) {
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
            horse_name: eventEl.horse_name,
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
        const { start, end, extendedProps } = arg.event;
        const { horse_name, student_name, lesson_id } = extendedProps;
        setSelectedEvent({
            start: start as Date,
            end: end as Date,
            horse_name: horse_name,
            student_name: student_name,
            lesson_id: lesson_id,
        });
        setPopupDisplay(!popupDisplay);
    };

    const handleEventDrop = async (arg: EventDropArg) => {
        const response = await editLesson(
            arg.event.extendedProps.lesson_id,
            arg.event.start,
            arg.event.end
        );

        if (response.status === 409) {
            arg.revert();
            alert(response.data.message);
        }
    };

    const handleEventResize = async (arg: EventResizeDoneArg) => {
        const response = await editLesson(
            arg.event.extendedProps.lesson_id,
            arg.event.start,
            arg.event.end
        );

        if (response.status === 409) {
            arg.revert();
            alert(response.data.message);
        }
    };

    const handleClick = () => {
        formDisplay && setFormDisplay(false);
        popupDisplay && setPopupDisplay(false);
    };

    return (
        <div className="relative sm:ml-64 overflow-hidden no-scrollbar w-full h-full sm:pt-0 pt-10">
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
                editable={roles.includes("Admin") ? true : false}
                events={events}
                dayMaxEventRows={1}
                displayEventTime={false}
                selectable={true}
                eventOverlap={false}
                eventClick={handleEventClick}
                select={roles.includes("Admin") ? handleSelectClick : undefined}
                eventContent={renderEventContent}
                eventDrop={handleEventDrop}
                eventResize={handleEventResize}
            />
            <div
                className={
                    formDisplay
                        ? "absolute z-[99999] visible top-2 left-1/2 transition-all ease-in-out duration-500 -translate-x-1/2"
                        : "absolute -translate-x-1/2 invisible z-[-1] -top-1/2 left-1/2 transition-all ease-in-out duration-500"
                }>
                <LessonForm
                    start={start}
                    end={end}
                    setStart={setStart}
                    setEnd={setEnd}
                    instructor={instructor as string}
                    setEvents={setEvents}
                    events={events}
                    studentInfo={studentInfo}
                    horseInfo={horseInfo}
                    setFormDisplay={setFormDisplay}
                />
            </div>
            <div
                className={
                    popupDisplay
                        ? "absolute z-[99999] visible top-2 left-1/2 transition-all ease-in-out duration-500 -translate-x-1/2"
                        : "absolute -translate-x-1/2 invisible z-[-1] -top-1/2 left-1/2 transition-all ease-in-out duration-500"
                }>
                <PopUp
                    selectedEvent={selectedEvent}
                    setPopupDisplay={setPopupDisplay}
                    setEvents={setEvents}
                    events={events}
                />
            </div>
            <div
                onClick={handleClick}
                className={
                    popupDisplay || formDisplay
                        ? "absolute opacity-0 visible bg-white z-[99998] w-full h-full top-0 transition-all ease-in-out duration-500"
                        : "absolute invisible opacity-0 z-[-1] bg-white w-full h-full transition-all ease-in-out duration-500"
                }></div>
            {roles.includes("User") ? null : (
                <Link
                    className="fixed bottom-3 max-sm:right-4 ml-2 z-[99999] text-2xl"
                    to="/lessons">
                    <BsArrowLeftCircleFill />
                </Link>
            )}
        </div>
    );
};

function renderEventContent(eventInfo: any) {
    return (
        <>
            <div className="bg-blue-400 w-full h-full rounded-md text-black overflow-hidden">
                {eventInfo.event.extendedProps.student_name}
            </div>
        </>
    );
}

export default Schedule;
