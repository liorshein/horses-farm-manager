import { Suspense, useState } from "react";
import {
    LoaderFunction,
    useLoaderData,
    defer,
    Await,
    Link,
} from "react-router-dom";
import { getStudents } from "../../api/students";
import useAuth from "../../hooks/useAuth";
import StudentCards from "./StudentCards";
import { FiUserPlus } from "react-icons/fi";
import Loader from "../../components/Loader";

export const loader: LoaderFunction = async () => {
    return defer({ myData: getStudents() });
};

const Students = () => {
    const { roles } = useAuth()!;
    const loaderData = useLoaderData() as any;
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <section className="flex-grow w-full sm:ml-64 h-screen flex flex-col items-center overflow-auto">
            <div className="flex w-full justify-between pb-4">
                <input
                    className="mt-5 sm:ml-10 ml-12 mr-2 py-1 px-4 placeholder:text-black"
                    type="text"
                    name="search"
                    placeholder="Search student..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {roles.includes("User") ? null : (
                    <Link
                        to="/students/new"
                        className="mt-5 text-2xl mr-5 sm:mr-10">
                        <FiUserPlus />
                    </Link>
                )}
            </div>
            <Suspense fallback={<Loader />}>
                <Await
                    resolve={loaderData.myData}
                    errorElement={<p>Error loading students</p>}>
                    {(loadedStudents) => (
                        <>
                            {
                                <StudentCards
                                    studentsData={loadedStudents.studentsData}
                                    roles={roles}
                                    searchTerm={searchTerm}
                                />
                            }
                        </>
                    )}
                </Await>
            </Suspense>
        </section>
    );
};

export default Students;
