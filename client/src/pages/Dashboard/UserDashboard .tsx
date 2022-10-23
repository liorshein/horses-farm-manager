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
    <section className={styles.main_content}>
      <div className={styles.upper}>
        <PersonalComp data={personalData} />
        <SalaryComp salaryArr={salaryData} />
        <FavHorseComp data={horsesData[0]} />
      </div>
      <div className={styles.chart}>
        <UserChart data={salaryData} />
      </div>
    </section>
  )
}

export default UserDashboard