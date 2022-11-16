import SalaryComp from "./SalaryComp";
import PersonalComp from "./PersonalComp";
import FavHorseComp from "./FavHorseComp";
import { UserDashboardData } from "../../util/types";
import UserChart from "./UserChart";

type Props = {
    dashboardData: UserDashboardData;
};

const UserDashboard = ({ dashboardData }: Props) => {
    const { salaryData, personalData, horsesData } = dashboardData;

    return (
        <>
            <div className="flex w-full mt-6 justify-between gap-4 flex-wrap px-10 flex-col lg:flex-row">
                <PersonalComp data={personalData} />
                <SalaryComp salaryArr={salaryData} />
                <FavHorseComp data={horsesData[0]} />
            </div>
            <div className="my-4 h-full w-full px-10">
                <UserChart salaryData={salaryData} />
            </div>
        </>
    );
};

export default UserDashboard;
