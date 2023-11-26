import React, { useEffect, useRef, useState } from 'react'
import styles from "./styles.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { fetchTaskData, updateTaskData } from '../../Redux/TasksReducer'
import { MdOutlineRemoveDone } from "react-icons/md";
import { MdDoneAll } from "react-icons/md";
import { message } from 'antd';


const Completed = () => {
    const dispatch = useDispatch()
    const tasks = useSelector(store => store.task.Task.data) || []

    useEffect(() => {
        dispatch(fetchTaskData())

    }, [dispatch])
    const updateTask = (id, data) => {
        dispatch(updateTaskData(id, data)).then((res) => {

            dispatch(fetchTaskData()).then((res2) => {
                message.success("Update Successfully")
            }).catch((err) => {
                message.error("Something went wrong")
            })

        }).catch((err) => {
            message.error("Something went wrong")
        })
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    };

    return (
        <div className={styles.MainContainer}>


            <div className={styles.table}>
                <div className={styles.tableHead}>
                    <span>Title</span>
                    <span>Category</span>
                    <span>Priority</span>
                    <span>last Date</span>
                    <span>Target</span>
                    <span>Status</span>
                    <span>Action</span>
                </div>
                {
                    tasks.map((el) => {
                        return (
                            <div className={styles.tableData} key={el._id}>

                                <span>{el.title}</span>
                                <span>{el.category}</span>
                                <span>{el.priority}</span>
                                <span>{formatDate(el.endDate)}</span>
                                <span>{el.target}</span>
                                <span>{el.completed ? "Completed" : "Pending"}</span>
                                <span className={styles.deleteIcon}>
                                    {
                                        el.completed ?
                                            <MdOutlineRemoveDone color='orange' onClick={() => updateTask(el._id, { completed: false })} />
                                            :
                                            <MdDoneAll color='green' onClick={() => updateTask(el._id, { completed: true })} />
                                    }
                                </span>

                            </div>
                        )
                    })
                }
            </div>


        </div>
    )
}

export default Completed