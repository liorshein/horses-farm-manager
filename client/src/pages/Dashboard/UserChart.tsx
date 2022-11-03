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
        <div className="flex-1 w-full h-fit">
            <ChartComponent
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
    );
};

export default UserChart;
