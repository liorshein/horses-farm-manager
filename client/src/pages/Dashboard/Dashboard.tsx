import useAuth from "../../hooks/useAuth";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import { Await, defer, LoaderFunction, useLoaderData } from "react-router-dom";
import { getData } from "../../api/dashboard";
import { LessonsData, UserDashboardData } from "../../util/types";
import { Suspense } from "react";
import Loader from "../../components/Loader";

export const loader: LoaderFunction = async () => {
    return defer({ myData: getData() });
};

const Dashboard = () => {
    const { roles } = useAuth()!;
    const loaderData = useLoaderData() as any;

    return (
        <section className="flex-grow w-full sm:ml-64 h-screen flex flex-col items-center overflow-auto">
            <Suspense fallback={<Loader />}>
                <Await
                    resolve={loaderData.myData}
                    errorElement={<p>Error loading horses!</p>}>
                    {(loadedData) => (
                        <>
                            {roles.includes("User") ? (
                                <UserDashboard
                                    dashboardData={
                                        loadedData as UserDashboardData
                                    }
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
        </section>
    );
};

export default Dashboard;
