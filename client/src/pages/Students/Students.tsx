import { Suspense, useState } from "react";
import {
    ActionFunction,
    LoaderFunction,
    useLoaderData,
    defer,
    Await,
} from "react-router-dom";
import {
    addStudent,
    deleteStudent,
    editStudent,
    getStudents,
} from "../../api/students";
import useAuth from "../../hooks/useAuth";
import { Student } from "../../util/types";
import StudentsForm from "./StudentsForm";
import StudentCards from "./StudentCards";
import { FiUserPlus } from "react-icons/fi";
import Loader from "../../components/Loader";

export const loader: LoaderFunction = async () => {
    return defer({ myData: getStudents() });
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
    const loaderData = useLoaderData() as any;

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
                    className="mt-5 sm:ml-10 ml-14 py-1 px-4 placeholder:text-black"
                    type="text"
                    name="search"
                    placeholder="Search student..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {roles.includes("User") ? null : (
                    <button
                        className="mt-5 text-2xl mr-5 sm:mr-10"
                        onClick={shiftComponent}>
                        <FiUserPlus />
                    </button>
                )}
            </div>
            <Suspense fallback={<Loader />}>
                <Await
                    resolve={loaderData.myData}
                    errorElement={<p>Error loading students</p>}>
                    {(loadedStudents) => (
                        <>
                            {showForm ? (
                                <StudentsForm
                                    instructorsData={
                                        loadedStudents.instructorsData
                                    }
                                    inputs={inputs}
                                    edit={edit}
                                    hidden={showForm}
                                    setInputs={setInputs}
                                    setEdit={setEdit}
                                    setHidden={setShowForm}
                                />
                            ) : (
                                <StudentCards
                                    studentsData={loadedStudents.studentsData}
                                    roles={roles}
                                    searchTerm={searchTerm}
                                    setHidden={setShowForm}
                                    setEdit={setEdit}
                                    setInputs={setInputs}
                                />
                            )}
                        </>
                    )}
                </Await>
            </Suspense>
        </section>
    );
};

export default Students;
