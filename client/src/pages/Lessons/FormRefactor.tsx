import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useEffect, useState } from "react";
import { Horse, Student } from "../../util/types";
import { axiosPrivate } from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { addLesson } from "../../api/lessons";
import moment from "moment";
import { Lesson } from "./Schedule";

type Props = {
    start: Date | undefined;
    end: Date | undefined;
    selectedInstructor: string;
    events: Lesson[];
    setEvents: React.Dispatch<React.SetStateAction<Lesson[]>>;
    setStart: React.Dispatch<React.SetStateAction<Date | undefined>>;
    setEnd: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

const FormRefactor = ({
    start,
    end,
    selectedInstructor,
    events,
    setEvents,
    setStart,
    setEnd,
}: Props) => {
    const [studentInfo, setStudentInfo] = useState<Student[]>([]);
    const [horseInfo, setHorseInfo] = useState<Horse[]>([]);
    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedHorse, setSelectedHorse] = useState("");

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getData = async () => {
            try {
                const horsesData = await (
                    await axiosPrivate.get("/admin/horses-available")
                ).data.result;
                isMounted && setHorseInfo(horsesData);
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

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getData = async () => {
            try {
                if (selectedInstructor !== "") {
                    let params = new URLSearchParams({
                        instructor_id: selectedInstructor,
                    });
                    const studentsData = await (
                        await axiosPrivate.get(
                            `/admin/instructor-students?${params}`
                        )
                    ).data.result;
                    isMounted && setStudentInfo(studentsData);
                    setSelectedStudent("");
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
    }, [selectedInstructor]);

    const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const lesson: Lesson = {
            start_time: start as Date,
            end_time: end as Date,
            student_id: Number(selectedStudent),
            horse_id: Number(selectedHorse),
            instructor_id: Number(selectedInstructor),
            arrived: null
        };

        await addLesson(lesson);

        let studentName = studentInfo.find(
            (student: Student) => student.student_id === Number(selectedStudent)
        )?.student_name;
        lesson.student_name = studentName as string;
        setEvents([...events, lesson]);
    };

    return (
        <div>
            <div>
                <label>Student</label>
                <select
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                >
                    <option>Pick Student</option>
                    {studentInfo.map((student: Student) => {
                        return (
                            <option
                                key={student.student_id}
                                value={student.student_id}
                            >
                                {student.student_name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div>
                <label>Horse</label>
                <select
                    value={selectedHorse}
                    onChange={(e) => {
                        setSelectedHorse(e.target.value);
                    }}
                >
                    <option>Pick Horse</option>
                    {horseInfo.map((horse: Horse) => {
                        return (
                            <option
                                key={horse.horse_id}
                                value={horse.horse_id}
                            >
                                {horse.horse_name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div>
                <label>Start</label>
                <DateTime
                    value={start}
                    onChange={(date) =>
                        moment.isMoment(date) ? setStart(date.toDate()) : null
                    }
                />
            </div>
            <div>
                <label>End</label>
                <DateTime
                    value={end}
                    onChange={(date) =>
                        moment.isMoment(date) ? setEnd(date.toDate()) : null
                    }
                />
            </div>
            <button
                type="submit"
                onClick={handleClick}
            >
                add
            </button>
        </div>
    );
};

export default FormRefactor;
