import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { axiosPrivate } from '../../api/axios';

ChartJS.register(...registerables);

const UserChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        count: []
    })

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getData = async () => {
            try {
                const data = await (await axiosPrivate.get(`/instructors/lessons-per-month`)).data.result.rows
                const labelsData = data.map((obj: string) => obj.substring)
                const countData = data.map((obj: { count: any }) => obj.count)
                isMounted && setChartData({
                    labels: labelsData,
                    count: countData,
                })
            } catch (error) {
                console.error(error);
            }
        }
        getData()

        return () => {
            isMounted = false;
            controller.abort()
        }
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

export default UserChart