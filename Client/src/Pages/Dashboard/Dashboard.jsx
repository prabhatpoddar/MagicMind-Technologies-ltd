import React, { useEffect, useRef, useState } from 'react'
import styles from "./styles.module.css"
import { Chart } from "react-google-charts";


import { MdOutlineRunningWithErrors } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";


const data = [
    ["Year", "Attendance"],
    ["Jan", 0],
    ["Feb", 0],
    ["Mar", 0],
    ["May", 0],
    ["June", 0],
    ["July", 0],
    ["Aug", 0],
];
const Dashboard = () => {
    const [chartData, setChartData] = useState(data)

    const options1 = {
        title: 'Category',
        colors: ['#333333', '#15EEB0', '#8CC9E9'],
        chartArea: { left: 0, top: 0, width: '100%', height: '60%' },
        legend: {
            position: 'center',
            textStyle: {
                fontSize: 8,
                fontWeight: 800


                // Add any other styles you want to apply to the legend text
            },
        },
    };

    const options3 = {
        title: 'Top Origin',
        chartArea: { left: 0, top: 0, width: '100%', height: '60%' },
        legend: {
            position: 'center',
            textStyle: {
                fontSize: 8,


                // Add any other styles you want to apply to the legend text
            },
        },


    };
    const data2 = [
        ["City", ""],
        ["City1", 11],
        ["City2", 15],
        ["City3", 51],
        ["City4", 91],
        ["City5", 20],
        ["City6", 30],

    ];
    const data3 = [
        ["City", ""],
        ["Bar (80%)", 11],
        ["Restaurants (5%)", 15],
        ["Coffeeshop (15%)", 51],
    ];

    const options = {
        legend: {
            position: 'none',
        },
    };
    return (
        <div className={styles.MainContainer}>

            <div className={styles.firstContainer}>
                <h1>User Dashboard</h1>


            </div>

            <div className={styles.cards}>
                <div className={styles.card}>
                    <IoCheckmarkDoneCircle fontSize={40} color='green' />
                    <p>Total Tasks</p>
                    <h1>20</h1>
                </div>
                <div className={styles.card}>

                    <MdOutlineRunningWithErrors fontSize={40} color='orange' />
                    <p>Pending Tasks</p>
                    <h1>10</h1>
                </div>
                <div className={styles.pieDiv}>
                    <div className={styles.title} >
                        Target
                    </div>
                    <Chart
                        chartType="PieChart"
                        data={data2}
                        options={options3}
                    />
                </div>
                <div className={styles.pieDiv} >
                    <div className={styles.title}>
                        Priority
                    </div>
                    <Chart
                        chartType="PieChart"
                        data={data3}
                        options={options1}


                    />
                </div>
            </div>
            <div className={styles.chartDiv}>
                <div className={styles.chart}>
                    <div className={styles.chartHead}>
                        <h2>User Report</h2>

                    </div>

                    <Chart
                        chartType="LineChart"
                        width="100%"
                        height="200px"
                        data={chartData}
                        options={options}
                    />


                </div>
                <div className={styles.sideTable}>
                    <h2>Recent Tasks</h2>
                    <div className={styles.tableDiv}>
                        <table className={styles.roundedTable}>
                            <tr>
                                <th>Title</th>
                                <th>Time Left</th>
                            </tr>
                            <tr>
                                <td>Partner 1</td>
                                <td>12</td>
                            </tr>
                            <tr>
                                <td>Partner 1</td>
                                <td>12</td>
                            </tr>
                            <tr>
                                <td>Partner 1</td>
                                <td>12</td>
                            </tr>
                            <tr>
                                <td>Partner 1</td>
                                <td>12</td>
                            </tr>
                            <tr>
                                <td>Partner 1</td>
                                <td>12</td>
                            </tr>


                        </table>
                    </div>


                </div>
            </div>


        </div>
    )
}

export default Dashboard