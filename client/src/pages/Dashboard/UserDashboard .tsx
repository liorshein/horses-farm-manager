import UserChart from "./UserChart";
import styles from "./dashboard.module.scss";
import SalaryComp from "./SalaryComp";
import PersonalComp from "./PersonalComp";
import FavHorseComp from "./FavHorseComp";
import { UserDashboardData } from "../../util/types";

type Props = {
  dashboardData: UserDashboardData;
};

const UserDashboard = ({ dashboardData }: Props) => {
  const { salaryData, personalData, horsesData } = dashboardData;

  return (
    <section className="flex-grow h-screen flex flex-col items-center max-sm:overflow-auto">
      <div className="flex w-[75vw] mt-6 justify-between gap-4 flex-wrap mx-4">
        <PersonalComp data={personalData} />
        <SalaryComp salaryArr={salaryData} />
        <FavHorseComp data={horsesData[0]} />
      </div>
      <div className="relative my-6 m-auto h-full w-[75vw] shadow-xl mx-4 border">
        <UserChart data={salaryData} />
      </div>
    </section>
  );
};

export default UserDashboard;
