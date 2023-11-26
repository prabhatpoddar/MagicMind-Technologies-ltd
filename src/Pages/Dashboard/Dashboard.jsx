import React, { useEffect, useRef, useState } from 'react'
import styles from "./styles.module.css"
import { Chart } from "react-google-charts";


import { MdOutlineRunningWithErrors } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { userRequest } from '../../requestMethod';
const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({})
    const [recent, setRecent] = useState("")
    useEffect(() => {
        userRequest.get(`api/user/getRecentTasks`).then((res) => {
            setRecent(res.data.data)
        }).catch((err) => {
            console.log('err:', err)

        })
        userRequest.get(`api/user/getDashboard`).then((res) => {
            setDashboardData(res.data)
        }).catch((err) => {
            console.log('err:', err)

        })
    }, [])

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
            },
        },


    };



    const options = {
        legend: {
            position: 'none',
        },
    };
    function calculateHoursLeft(targetDate) {
        const targetTime = new Date(targetDate).getTime();
        const currentTime = new Date().getTime();
        const timeDiff = targetTime - currentTime;

        

        const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));

        return ` ${hoursLeft}`;
    }
    return (
        <div className={styles.MainContainer}>

            <div className={styles.firstContainer}>
                <h1>User Dashboard</h1>


            </div>

            <div className={styles.cards}>
                <div className={styles.card}>
                    <IoCheckmarkDoneCircle fontSize={40} color='green' />
                    <p>Total Tasks</p>
                    <h1>{dashboardData.totalTask}</h1>
                </div>
                <div className={styles.card}>

                    <MdOutlineRunningWithErrors fontSize={40} color='orange' />
                    <p>Pending Tasks</p>
                    <h1>{dashboardData.pendingTask}</h1>
                </div>
                <div className={styles.pieDiv}>
                    <div className={styles.title} >
                        Target
                    </div>
                    <Chart
                        chartType="PieChart"
                        data={dashboardData?.targetData}
                        options={options3}
                    />
                </div>
                <div className={styles.pieDiv} >
                    <div className={styles.title}>
                        Priority
                    </div>
                    <Chart
                        chartType="PieChart"
                        data={dashboardData?.priorityData}
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
                        data={dashboardData.monthlyData}
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
                            {
                                recent.length > 0 && recent.map((el) => {
                                    return (
                                        <tr key={el._id}>
                                            <td>{el.title}</td>
                                            <td>{calculateHoursLeft(el.endDate)}</td>
                                        </tr>
                                    )
                                })
                            }



                        </table>
                    </div>


                </div>
            </div>


        </div>
    )
}

export default Dashboard