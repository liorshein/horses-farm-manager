import { useState } from "react";
import {
    ActionFunction,
    LoaderFunction,
    useLoaderData,
} from "react-router-dom";
import {
    addStudent,
    deleteStudent,
    editStudent,
    getStudents,
} from "../../api/students";
import useAuth from "../../hooks/useAuth";
import { Instructor, Student } from "../../util/types";
import styles from "./students.module.scss";
import StudentsForm from "./StudentsForm";
import StudentCards from "./StudentCards";
import { FiUserPlus } from "react-icons/fi";

type Data = {
    instructorsData: Instructor[];
    studentsData: Student[];
};

export const loader: LoaderFunction = async () => {
    return getStudents();
};

export const action: ActionFunction = async ({ request }) => {
    switch (request.method) {
        case "POST": {
            const formData = await request.formData();
            const student = Object.fromEntries(formData);
            await addStudent(student);
            break;
        }

        case "PUT": {
            const formData = await request.formData();
            const student = Object.fromEntries(formData);
            await editStudent(student);
            break;
        }

        case "DELETE": {
            const studentId = request.url.split("?")[1];
            await deleteStudent(studentId);
            break;
        }
    }
};

const Students = () => {
    const { roles } = useAuth()!;
    const { instructorsData, studentsData } = useLoaderData() as Data;

    const [showForm, setShowForm] = useState(false);
    const [edit, setEdit] = useState(false);
    const [inputs, setInputs] = useState<Student>({
        student_id: 0,
        student_name: "",
        id: "",
        date_of_birth: "",
        age: "",
        weight: "",
        height: "",
        hmo: "",
        address: "",
        framework: "",
        working_on: "",
        instructor_id: 0,
        instructor_name: "",
    });
    const [searchTerm, setSearchTerm] = useState("");

    const shiftComponent = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setShowForm(!showForm);
    };

    return (
        <section className="flex-grow w-full sm:ml-64 h-screen flex flex-col items-center overflow-auto">
            <div className="flex w-full justify-between pb-4">
                <input
                    className="mt-5 sm:ml-10 ml-16 py-1 px-4 placeholder:text-black"
                    type="text"
                    name="search"
                    placeholder="Search student..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {roles.includes("User") ? null : (
                    <button
                        className="mt-5 text-2xl mr-10"
                        onClick={shiftComponent}
                    >
                        <FiUserPlus />
                    </button>
                )}
            </div>
            {showForm ? (
                <StudentsForm
                    instructorsData={instructorsData}
                    inputs={inputs}
                    edit={edit}
                    hidden={showForm}
                    setInputs={setInputs}
                    setEdit={setEdit}
                    setHidden={setShowForm}
                />
            ) : (
                <StudentCards
                    studentsData={studentsData}
                    roles={roles}
                    searchTerm={searchTerm}
                    setHidden={setShowForm}
                    setEdit={setEdit}
                    setInputs={setInputs}
                />
            )}
        </section>
    );
};

export default Students;
