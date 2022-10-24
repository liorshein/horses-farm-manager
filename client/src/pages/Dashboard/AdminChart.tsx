import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { ChartData, LessonsData } from '../../util/types';
import { useEffect, useState } from 'react';

ChartJS.register(...registerables);

type Props = {
    dashboardData: LessonsData[]
    selectedMonth: string
}

const AdminChart = ({ dashboardData, selectedMonth }: Props) => {
    const [chartData, setChartData] = useState<ChartData>()

    useEffect(() => {
        const getData = async () => {
            const currentMonthData = dashboardData.filter((obj: LessonsData) => obj.substring === selectedMonth).sort((a: LessonsData, b: LessonsData) => (a.instructor_name > b.instructor_name ? 1 : -1))            
            const labelsData: string[] = currentMonthData.map((obj: LessonsData) => obj.instructor_name)
            const countData: number[] = currentMonthData.map((obj: LessonsData) => obj.count)
            setChartData({
                labels: labelsData,
                count: countData,
            })
        }
        getData()
    }, [selectedMonth])

    return (
        <>

            <Bar
                data={{
                    labels: chartData?.labels,
                    datasets: [
                        {
                            label: "Lessons",
                            data: chartData?.count,
                            backgroundColor: "#77635A"
                        }
                    ],
                }}
                options={{
                    scales: {
                        x: {
                            ticks: {
                                color: "black",
                                font: {
                                    size: 16,
                                }
                            }
                        },
                        y: {
                            suggestedMax: 200,
                            ticks: {
                                color: "black",
                                font: {
                                    size: 16,
                                }
                            }
                        }
                    },
                    layout: {
                        padding: 10
                    },
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </>
    )
}

export default AdminChart