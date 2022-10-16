import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { axiosPrivate } from '../../api/axios';

ChartJS.register(...registerables);

type Props = {
    data: {
        labels: never[];
        count: never[];
    }
}

const UserChart = ({data}: Props) => {
    return (
        <>
            <Bar
                data={{
                    labels: data.labels,
                    datasets: [
                        {
                            label: "Lessons",
                            data: data.count,
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