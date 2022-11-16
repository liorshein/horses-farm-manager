import { LessonsData } from "../../util/types";
import AdminChart from "./AdminChart";

type Props = {
    dashboardData: LessonsData[];
};

const AdminDashboard = ({ dashboardData }: Props) => {
    return (
        <div className="my-4 h-full w-full px-10">
            <AdminChart salaryData={dashboardData} />
        </div>
    );
};

export default AdminDashboard;
