import UserChart from './UserChart';
import styles from "./dashboard.module.scss"
import SalaryComp from './SalaryComp';
import PersonalComp from './PersonalComp';
import FavHorseComp from './FavHorseComp';
import { UserDashboardData } from '../../util/types';

type Props = {
  dashboardData: UserDashboardData
}

const UserDashboard = ({ dashboardData }: Props) => {
  const { salaryData, personalData, horsesData } = dashboardData  

  return (
    <section className='flex-grow h-screen flex flex-col items-center justify-between overflow-auto'>
      <div className='flex mt-6 w-full px-16 justify-between gap-6'>
        <PersonalComp data={personalData} />
        <SalaryComp salaryArr={salaryData} />
        <FavHorseComp data={horsesData[0]} />
      </div>
      <div className='relative m-auto h-[60vh] w-[80vw] shadow-xl'>
        <UserChart data={salaryData} />
      </div>
    </section>
  )
}

export default UserDashboard