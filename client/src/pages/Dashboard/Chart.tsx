import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { axiosPrivate } from '../../api/axios';

ChartJS.register(...registerables);

const Chart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        count: []
    })

    useEffect(() => {
        const getData = async () => {
            const data = await (await axiosPrivate.get(`/instructors/lessons-per-month`)).data.result.rows
            const labelsData = data.map((obj: string) => obj.substring)
            const countData = data.map((obj: { count: any }) => obj.count)
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
                    labels: chartData.labels,
                    datasets: [
                        {
                            label: "Lessons",
                            data: chartData.count,
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

export default Chart