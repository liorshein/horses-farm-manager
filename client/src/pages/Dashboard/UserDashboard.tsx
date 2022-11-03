import SalaryComp from "./SalaryComp";
import PersonalComp from "./PersonalComp";
import FavHorseComp from "./FavHorseComp";
import { UserDashboardData } from "../../util/types";
import { RiNumbersLine } from "react-icons/ri";
import UserChart from "./UserChart";

type Props = {
  dashboardData: UserDashboardData;
};

const UserDashboard = ({ dashboardData }: Props) => {
  const { salaryData, personalData, horsesData } = dashboardData;

  return (
    <section className="flex-grow w-full sm:ml-64 h-screen flex flex-col items-center overflow-auto">
      <div className="flex w-full mt-6 justify-between gap-4 flex-wrap px-10 flex-col lg:flex-row">
        <PersonalComp data={personalData} />
        <SalaryComp salaryArr={salaryData} />
        <FavHorseComp data={horsesData[0]} />
      </div>
      <div className="my-4 h-full w-full px-10">
        <div className="flex flex-col h-full w-full shadow-xl border min-w-[245.95px]">
          <div className="flex-1 flex items-center text-2xl ml-6 my-3 font-bold">
            <RiNumbersLine />
            <h2 className="tracking-tight ml-1 pt-[0.375rem]">
              Lessons
            </h2>
          </div>
          <UserChart salaryData={salaryData}/>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
