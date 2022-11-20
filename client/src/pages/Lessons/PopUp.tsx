import { AiOutlineCloseCircle } from "react-icons/ai";
import { deleteLesson } from "../../api/lessons";
import useAuth from "../../hooks/useAuth";
import { Lesson } from "../../util/types";

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
        try {
            await deleteLesson(LessonId!.toString()!);
            const eventFiltered = events.filter(
                (lesson: Lesson) => lesson.lesson_id !== LessonId
            );
            setEvents(eventFiltered);
            setPopupDisplay(false);
        } catch (error) {}
    };

    return (
        <div className="w-full h-full flex justify-center">
            <div className="relative flex flex-col items-start bg-primary shadow-lg px-5 rounded-xl">
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
                        className="px-2 py-1 mb-4 mx-1 self-center bg-[#00000038] border-[2px_solid_#38363654] cursor-pointer text-black hover:text-white rounded transition-[all_0.2s_cubic-bezier(0.79, 0.14, 0.15, 0.86)] hover:bg-[#887560] hover:transition-[all_0.1s_ease] focus:shadow-[0px_0px_0px_2px_#a7a7a7b5] focus:bg-[#00000061]"
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
