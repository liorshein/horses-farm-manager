import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useState } from "react";
import { Horse, Lesson, Student } from "../../util/types";
import { addLesson } from "../../api/lessons";
import moment from "moment";
import { AiOutlineCloseCircle } from "react-icons/ai";

type Props = {
    start: Date | undefined;
    end: Date | undefined;
    instructor: string;
    events: Lesson[];
    studentInfo: Student[];
    horseInfo: Horse[];
    setEvents: React.Dispatch<React.SetStateAction<Lesson[]>>;
    setStart: React.Dispatch<React.SetStateAction<Date | undefined>>;
    setEnd: React.Dispatch<React.SetStateAction<Date | undefined>>;
    setFormDisplay: React.Dispatch<React.SetStateAction<boolean>>;
};

const LessonForm = ({
    start,
    end,
    instructor,
    events,
    setEvents,
    setStart,
    setEnd,
    studentInfo,
    horseInfo,
    setFormDisplay,
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
        };

        if (!Object.values(lesson).includes(0)) {
            const response = await addLesson(lesson);
            if (response) {
                const studentName = studentInfo.find(
                    (student: Student) =>
                        student.student_id === Number(selectedStudent)
                )?.student_name;
                const horseName = horseInfo.find(
                    (horse: Horse) => horse.horse_id === Number(selectedHorse)
                )?.horse_name;
                lesson.student_name = studentName as string;
                lesson.horse_name = horseName as string;
                lesson.lesson_id = response.lesson_id;

                lesson["start"] = lesson["start_time"];
                lesson["end"] = lesson["end_time"];
                delete lesson["start_time"];
                delete lesson["end_time"];

                setEvents([...events, lesson]);
                setFormDisplay(false);
            }
        } else {
            alert("Please select valid info!");
        }
    };

    return (
        <div className="w-full h-full flex justify-center">
            <div className="relative flex flex-col items-start bg-primary shadow-lg px-5 rounded-xl">
                <button
                    className="absolute right-2 top-2 text-2xl"
                    onClick={() => setFormDisplay(false)}>
                    <AiOutlineCloseCircle />
                </button>
                <h2 className="text-2xl my-2 underline tracking-tight">
                    New Lesson
                </h2>
                <div className="flex flex-col mb-3">
                    <label className="mb-1 font-bold">Student</label>
                    <select
                        className="rounded"
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}>
                        <option value={0}>Pick Student</option>
                        {studentInfo.map((student: Student) => {
                            return (
                                <option
                                    key={student.student_id}
                                    value={student.student_id}>
                                    {student.student_name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="flex flex-col mb-3">
                    <label className="mb-1 font-bold">Horse</label>
                    <select
                        className="rounded"
                        value={selectedHorse}
                        onChange={(e) => {
                            setSelectedHorse(e.target.value);
                        }}>
                        <option value={0}>Pick Horse</option>
                        {horseInfo.map((horse: Horse) => {
                            return (
                                <option
                                    key={horse.horse_id}
                                    value={horse.horse_id}>
                                    {horse.horse_name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="flex flex-col mb-3">
                    <label className="mb-1 font-bold">Start</label>
                    <DateTime
                        value={start}
                        onChange={(date) =>
                            moment.isMoment(date)
                                ? setStart(date.toDate())
                                : null
                        }
                    />
                </div>
                <div className="flex flex-col mb-3">
                    <label className="mb-1 font-bold">End</label>
                    <DateTime
                        value={end}
                        onChange={(date) =>
                            moment.isMoment(date) ? setEnd(date.toDate()) : null
                        }
                    />
                </div>
                <button
                    className="px-2 py-1 mt-2 mb-4 mx-1 self-center bg-[#00000038] border-[2px_solid_#38363654] cursor-pointer text-black hover:text-white rounded transition-[all_0.2s_cubic-bezier(0.79, 0.14, 0.15, 0.86)] hover:bg-[#887560] hover:transition-[all_0.1s_ease] focus:shadow-[0px_0px_0px_2px_#a7a7a7b5] focus:bg-[#00000061]"
                    type="submit"
                    onClick={handleClick}>
                    Add Lesson
                </button>
            </div>
        </div>
    );
};

export default LessonForm;
