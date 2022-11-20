import {
    Category,
    ChartComponent,
    DataLabel,
    Legend,
    Tooltip,
    Inject,
    AxisModel,
    SeriesCollectionDirective,
    SeriesDirective,
    ColumnSeries,
    TooltipSettingsModel,
} from "@syncfusion/ej2-react-charts";
import { useEffect, useState } from "react";
import { RiNumbersLine } from "react-icons/ri";
import { Salary } from "../../util/types";

type Props = {
    salaryData: Salary[];
};

const AdminChart = ({ salaryData }: Props) => {
    const [selectedMonth, setSelectedMonth] = useState<string>();
    const [months, setMonths] = useState<string[]>();
    const [filteredData, setFilteredData] = useState<Salary[]>([]);

    useEffect(() => {
        const getMonth = () => {
            try {
                setSelectedMonth(salaryData[0].mydate);
            } catch (error) {
                setSelectedMonth(undefined);
            }
            const uniqData: string[] = [];
            salaryData.filter((element: Salary) => {
                const isDuplicate = uniqData.includes(element.mydate);
                if (!isDuplicate) {
                    uniqData.push(element.mydate);
                    return true;
                }
                return false;
            });
            setMonths(uniqData);
        };
        getMonth();
    }, [salaryData]);

    useEffect(() => {
        const filterData = () => {
            let filtered = salaryData.filter(
                (element: Salary) => element.mydate === selectedMonth
            );
            setFilteredData(filtered);
        };
        filterData();
    }, [salaryData, selectedMonth]);

    const primaryxAxis: AxisModel = { valueType: "Category" };
    const primaryyAxis: AxisModel = { minimum: 0, maximum: 80, interval: 10 };
    const legendSettings = { visible: false };
    const tooltip: TooltipSettingsModel = { enable: true };

    return (
        <div className="flex flex-col h-full w-full shadow-xl border min-w-[240px] min-h-[80vh] xl:min-h-0">
            <div className="flex items-center justify-between w-full flex-col sm:flex-row">
                <div className="flex-0 flex items-center text-2xl ml-6 my-3 font-bold">
                    <RiNumbersLine />
                    <h2 className="tracking-tight ml-1 pt-[0.375rem]">
                        Lessons
                    </h2>
                </div>
                <select
                    className="mr-4 pt-1 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200"
                    name="months"
                    id="months"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}>
                    {months && months.length > 0 ? (
                        months?.map((month: string) => {
                            return (
                                <option
                                    key={month}
                                    value={month}>
                                    {month}
                                </option>
                            );
                        })
                    ) : (
                        <option>Select month</option>
                    )}
                </select>
            </div>
            <div className="flex-1 w-full h-fit">
                <ChartComponent
                    style={{ height: "100%", width: "100%" }}
                    id="charts"
                    primaryXAxis={primaryxAxis}
                    primaryYAxis={primaryyAxis}
                    legendSettings={legendSettings}
                    tooltip={tooltip}>
                    <Inject
                        services={[
                            ColumnSeries,
                            Legend,
                            Tooltip,
                            DataLabel,
                            Category,
                        ]}
                    />
                    <SeriesCollectionDirective>
                        <SeriesDirective
                            dataSource={filteredData}
                            xName="instructor_name"
                            yName="count"
                            name="Lessons Per Month"
                            type="Column"
                        />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
        </div>
    );
};

export default AdminChart;
