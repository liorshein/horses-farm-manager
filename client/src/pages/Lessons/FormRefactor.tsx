import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useState } from "react";
import { Horse, Student } from "../../util/types";
import { addLesson } from "../../api/lessons";
import moment from "moment";
import { Lesson } from "./Schedule";

type Props = {
    start: Date | undefined;
    end: Date | undefined;
    instructor: string;
    events: Lesson[];
    studentInfo: Student[]
    horseInfo: Horse[]
    setEvents: React.Dispatch<React.SetStateAction<Lesson[]>>;
    setStart: React.Dispatch<React.SetStateAction<Date | undefined>>;
    setEnd: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

const FormRefactor = ({
    start,
    end,
    instructor,
    events,
    setEvents,
    setStart,
    setEnd,
    studentInfo,
    horseInfo
}: Props) => {
    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedHorse, setSelectedHorse] = useState("");

    const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const lesson: Lesson = {
            start_time: start as Date,
            end_time: end as Date,
            student_id: Number(selectedStudent),
            horse_id: Number(selectedHorse),
            instructor_id: Number(instructor),
            arrived: null,
        };

        await addLesson(lesson);

        let studentName = studentInfo.find(
            (student: Student) => student.student_id === Number(selectedStudent)
        )?.student_name;
        lesson.student_name = studentName as string;

        lesson["start"] = lesson["start_time"]
        lesson["end"] = lesson["end_time"]
        delete lesson["start_time"];
        delete lesson["end_time"];

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
