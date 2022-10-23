import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { ChartData, Salary } from '../../util/types';
import { useEffect, useState } from 'react';

ChartJS.register(...registerables);

type Props = {
    data: Salary[]
}

const UserChart = ({ data }: Props) => {
    const [chartData, setChartData] = useState<ChartData>()

    useEffect(() => {
        const getData = async () => {
            const labelsData = data.map((obj: Salary) => obj.substring)
            const countData = data.map((obj: Salary) => obj.count)
            setChartData({
                labels: labelsData,
                count: countData,
            })
        }
        getData()
    }, [])
    
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
                            suggestedMax: 50,
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
                        },
                        title: {
                            display: true,
                            position: 'top',
                            text: "Lessons Per Month",
                            font: { size: 24 },
                            color: "black"
                        }
                    },
                }}
            />
        </>
    )
}

export default UserChart