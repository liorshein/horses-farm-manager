import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { axiosPrivate } from '../../api/axios';
import { Chart as ChartJS, registerables } from 'chart.js';
import styles from "./dashboard.module.scss"

ChartJS.register(...registerables);

type Props = {
    chartData: {
        labels: any[];
        count: any[];
    }
}

const AdminChart = (props: Props) => {
    return (
        <>

            <Bar
                data={{
                    labels: props.chartData.labels,
                    datasets: [
                        {
                            label: "Lessons",
                            data: props.chartData.count,
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