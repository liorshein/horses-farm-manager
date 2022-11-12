import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Instructor } from "../../util/types";

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
        <div className="relative ml-64 overflow-auto no-scrollbar w-full">
            {roles.includes("User")
                ? null
                : instructorsInfo.map((instructor: Instructor) => {
                      return (
                          <div key={instructor.instructor_id}>
                              <Link to={`${instructor.instructor_id}`}>{instructor.instructor_name}</Link>
                          </div>
                      );
                  })}
        </div>
    );
};

export default LessonsRefactor;
