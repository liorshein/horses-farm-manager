import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Instructor } from "../../util/types";
import { BsPersonCircle } from "react-icons/bs";

let baseURL: string;

if (process.env.NODE_ENV === "production") {
    baseURL = "/api";
} else {
    baseURL = "http://localhost:3500/api";
}

const LessonsRefactor = () => {
    const { roles } = useAuth()!;
    const [instructorsInfo, setInstructorsInfo] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getData = async () => {
            try {
                if (!roles.includes("User")) {
                    const allInstructors = await (
                        await axiosPrivate.get("/admin/instructors")
                    ).data.result;
                    isMounted && setInstructorsInfo(allInstructors);
                }
            } catch (error) {
                navigate("/login", {
                    state: { from: location },
                    replace: true,
                });
            }
        };
        getData();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    return (
        <div className="relative sm:ml-64 mr-5 overflow-auto no-scrollbar w-full flex content-start flex-wrap max-md:justify-center">
            {roles.includes("User")
                ? null
                : instructorsInfo.map((instructor: Instructor) => {
                      return (
                          <Link
                              key={instructor.instructor_id}
                              to={`${instructor.instructor_id}`}
                              className="ml-5 bg-white w-56 h-40 flex flex-col items-center justify-between border mt-5 shadow-lg"
                          >
                              <BsPersonCircle className="text-4xl ml-2 my-2" />
                              <p className="text-2xl mb-12">
                                  {instructor.instructor_name}
                              </p>
                          </Link>
                      );
                  })}
        </div>
    );
};

export default LessonsRefactor;
