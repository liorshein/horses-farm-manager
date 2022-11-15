import { LessonsData } from "../../util/types";
import AdminChart from "./AdminChart"

type Props = {
    dashboardData: LessonsData[];
};

const AdminDashboard = ({ dashboardData }: Props) => {
    return (
        <section className="flex-grow w-full sm:ml-64 h-screen flex flex-col items-center overflow-auto">
            <div className="my-4 h-full w-full px-10">
                <AdminChart salaryData={dashboardData} />
            </div>
        </section>
    );
};

export default AdminDashboard;
