import { Lesson } from "./Schedule";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { deleteLesson } from "../../api/lessons";
import useAuth from "../../hooks/useAuth";

type Props = {
    selectedEvent: Lesson | undefined;
    setPopupDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    events: Lesson[];
    setEvents: React.Dispatch<React.SetStateAction<Lesson[]>>;
};

const PopUp = ({
    setPopupDisplay,
    selectedEvent,
    events,
    setEvents,
}: Props) => {
    const { roles } = useAuth()!;

    const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const LessonId = selectedEvent?.lesson_id;
        const response = await deleteLesson(LessonId!.toString()!);
        if (response.status === 200) {
            const eventFiltered = events.filter(
                (lesson: Lesson) => lesson.lesson_id !== LessonId
            );
            setEvents(eventFiltered);
            setPopupDisplay(false);
        }
    };

    return (
        <div className="w-full h-full flex justify-center">
            <div className="relative flex flex-col items-start bg-slate-200 shadow-lg px-5">
                <button
                    className="absolute right-2 top-2 text-2xl"
                    onClick={() => setPopupDisplay(false)}>
                    <AiOutlineCloseCircle />
                </button>
                <h2 className="text-2xl my-2 underline tracking-tight">
                    Lesson Details
                </h2>
                <div className="flex flex-col mb-3">
                    <p className="mb-1 font-bold">
                        Student: {selectedEvent?.student_name}
                    </p>
                </div>
                <div className="flex flex-col mb-3">
                    <p className="mb-1 font-bold">
                        Horse: {selectedEvent?.horse_name}
                    </p>
                </div>
                <div className="flex flex-col mb-3">
                    <p className="mb-1 font-bold">
                        Time:{" "}
                        {selectedEvent?.start?.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {selectedEvent?.end?.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                </div>
                {roles.includes("Admin") ? (
                    <button
                        className="px-2 py-1 bg-slate-300 rounded-lg my-2 mx-1 self-center text-xl"
                        type="submit"
                        onClick={handleClick}>
                        Delete
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default PopUp;
