import useAuth from "../../hooks/useAuth";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import { Await, defer, LoaderFunction, useLoaderData } from "react-router-dom";
import { getData } from "../../api/dashboard";
import { LessonsData, UserDashboardData } from "../../util/types";
import { Suspense } from "react";
import Loader from "../../components/Loader/Loader";

export const loader: LoaderFunction = async () => {
    return defer({ myData: getData() });
};

const Dashboard = () => {
    const { roles } = useAuth()!;
    const loaderData = useLoaderData() as any;

    return (
        <Suspense fallback={<Loader />}>
            <Await
                resolve={loaderData.myData}
                errorElement={<p>Error loading horses!</p>}>
                {(loadedData) => (
                    <>
                        {roles.includes("User") ? (
                            <UserDashboard
                                dashboardData={loadedData as UserDashboardData}
                            />
                        ) : (
                            <AdminDashboard
                                dashboardData={loadedData as LessonsData[]}
                            />
                        )}
                    </>
                )}
            </Await>
        </Suspense>
    );
};

export default Dashboard;
