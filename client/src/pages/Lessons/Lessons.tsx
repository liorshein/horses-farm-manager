import {
    Await,
    defer,
    Link,
    LoaderFunction,
    useLoaderData,
} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Instructor } from "../../util/types";
import { BsPersonCircle } from "react-icons/bs";
import { getInstructors } from "../../api/lessons";
import Loader from "../../components/Loader";
import { Suspense } from "react";

export const loader: LoaderFunction = async () => {
    return defer({ myData: getInstructors() });
};

const Lessons = () => {
    const { roles } = useAuth()!;
    const loaderData = useLoaderData() as any;

    return (
        <div className="relative sm:ml-64 mr-5 overflow-auto no-scrollbar w-full flex content-start flex-wrap max-md:justify-center">
            <Suspense fallback={<Loader />}>
                <Await
                    resolve={loaderData.myData}
                    errorElement={<p>Error loading lessons!</p>}>
                    {(loadedInstructors) => (
                        <>
                            {roles.includes("User")
                                ? null
                                : loadedInstructors.map(
                                      (instructor: Instructor) => {
                                          return (
                                              <Link
                                                  key={instructor.instructor_id}
                                                  to={`${instructor.instructor_id}`}
                                                  className="ml-5 bg-white w-56 h-40 flex flex-col items-center justify-around border mt-5 shadow-lg">
                                                  <BsPersonCircle className="text-4xl ml-2 my-2" />
                                                  <p className="text-2xl mb-4">
                                                      {
                                                          instructor.instructor_name
                                                      }
                                                  </p>
                                              </Link>
                                          );
                                      }
                                  )}
                        </>
                    )}
                </Await>
            </Suspense>
        </div>
    );
};

export default Lessons;
