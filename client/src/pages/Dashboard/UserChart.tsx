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
import { RiNumbersLine } from "react-icons/ri";
import { Salary } from "../../util/types";

type Props = {
    salaryData: Salary[];
};

const UserChart = ({ salaryData }: Props) => {
    const primaryxAxis: AxisModel = { valueType: "Category" };
    const primaryyAxis: AxisModel = { minimum: 0, maximum: 80, interval: 10 };
    const legendSettings = { visible: false };
    const tooltip: TooltipSettingsModel = { enable: true };

    return (
        <div className="flex flex-col h-full w-full shadow-xl border min-w-[240px] min-h-[80vh] xl:min-h-0">
            <div className="flex-0 flex items-center text-2xl ml-6 my-3 font-bold">
                <RiNumbersLine />
                <h2 className="tracking-tight ml-1 pt-[0.375rem]">Lessons</h2>
            </div>
            <div className="flex-1 w-full h-fit">
                <ChartComponent
                    style={{ height: "100%", width: "100%" }}
                    id="charts"
                    primaryXAxis={primaryxAxis}
                    primaryYAxis={primaryyAxis}
                    legendSettings={legendSettings}
                    tooltip={tooltip}
                >
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
                            dataSource={salaryData}
                            xName="substring"
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

export default UserChart;
