import { useEffect, useState } from "react";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { Salary, Month } from "../../util/types";

type Props = {
    salaryArr: Salary[]
}

const currentMonth = new Date().toISOString().slice(0, 7)
const salaryPerHour: number = 75;

const SalaryComp = ({ salaryArr }: Props) => {
    const [salaryMonth, setSalaryMonth] = useState(currentMonth)
    const [salary, setSalary] = useState(0)

    useEffect(() => {
        const getData = async () => {
            const currentSalary = salaryArr.find((obj: Salary) => obj.substring === salaryMonth)?.count
            currentSalary && setSalary(currentSalary)
        }
        getData()
    }, [salaryMonth])

    return (
        <div className='flex-1 shadow-xl flex flex-col justify-start items-start border'>
            <div className="flex items-center justify-between w-full mx-6">
                <div className="flex items-center text-2xl ml-6 mt-3 font-bold">
                    <AiOutlineDollarCircle />
                    <h2 className='tracking-tight ml-1 pt-[0.375rem]'>Salary</h2>
                </div>
                <select className='mr-6 mt-3 px-0 pt-1 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200' name="months" id="months" value={salaryMonth} onChange={(e) => setSalaryMonth(e.target.value)}>
                    <option value={undefined}>Select month</option>
                    {salaryArr?.map((month: Month) => {
                        return <option key={month.substring} value={month.substring}>{month.substring}</option>
                    })}
                </select>
            </div>
            <div className='self-center mt-10 text-6xl'><>{salaryFormat(salary)}&#8362;</></div>
        </div>
    )
}

const salaryFormat = (hours: number) => {
    let salary = hours * salaryPerHour
    return String(salary).replace(/(.)(?=(\d{3})+$)/g, '$1,')
}

export default SalaryComp