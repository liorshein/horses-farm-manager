import { useEffect, useState } from "react";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { Salary, Month } from "../../util/types";

type Props = {
    salaryArr: Salary[];
};

const salaryPerHour: number = 75;

const SalaryComp = ({ salaryArr }: Props) => {
    const [salaryMonth, setSalaryMonth] = useState<string>();
    const [salary, setSalary] = useState(0);

    useEffect(() => {
        const getMonth = () => {
            try {
                setSalaryMonth(salaryArr[0].mydate);
            } catch (error) {
                setSalaryMonth(undefined);
            }
        };
        getMonth();
    }, [salaryArr]);

    useEffect(() => {
        const getData = () => {
            const currentSalary = salaryArr.find(
                (obj: Salary) => obj.mydate === salaryMonth
            )?.count;
            currentSalary && setSalary(currentSalary);
        };
        getData();
    }, [salaryArr, salaryMonth]);

    return (
        <div className="flex-1 shadow-xl flex flex-col justify-start items-start border">
            <div className="flex items-center justify-between w-full flex-col sm:flex-row">
                <div className="flex items-center text-2xl mx-6 mt-3 font-bold">
                    <AiOutlineDollarCircle />
                    <h2 className="tracking-tight ml-1">Salary</h2>
                </div>
                <select
                    className="mt-3 mr-2 pt-1 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200"
                    name="months"
                    id="months"
                    value={salaryMonth}
                    onChange={(e) => setSalaryMonth(e.target.value)}>
                    {salaryArr.length > 0 ? (
                        salaryArr?.map((month: Month) => {
                            return (
                                <option
                                    key={month.mydate}
                                    value={month.mydate}>
                                    {month.mydate}
                                </option>
                            );
                        })
                    ) : (
                        <option>Select month</option>
                    )}
                </select>
            </div>
            <div className="self-center mt-10 text-6xl">
                <>{salaryFormat(salary)}&#8362;</>
            </div>
        </div>
    );
};

const salaryFormat = (hours: number) => {
    let salary = hours * salaryPerHour;
    return String(salary).replace(/(.)(?=(\d{3})+$)/g, "$1,");
};

export default SalaryComp;
