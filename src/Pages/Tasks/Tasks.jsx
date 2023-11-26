import React, { useEffect } from 'react'
import styles from "./styles.module.css"
import { MdDelete } from 'react-icons/md';
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaskData, updateTaskData } from '../../Redux/TasksReducer';
import { Input, Select, message } from 'antd';
import CountdownTimer from '../../Components/Timer';
import { MdOutlineRemoveDone } from "react-icons/md";
import { MdDoneAll } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Delete from '../../Components/Delete';


const Tasks = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
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

    return (
        <div className={styles.MainContainer}>
{/* Sorry Didn't get time to work on filter */}


            {/* <div className={styles.filter}>
                <Select
                    showSearch
                    placeholder="Select priority"
                    // value={taskData.priority}
                    // onChange={(value) => handleInputChange('priority', value)}
                    options={[
                        { value: 'High', label: 'High' },
                        { value: 'Low', label: 'Low' },
                        { value: 'Medium', label: 'Medium' },
                    ]}
                />

                <Select
                    showSearch
                    placeholder="Select category"
                    // value={taskData.category}
                    // onChange={(value) => handleInputChange('category', value)}
                    options={[
                        { value: 'Meetings', label: 'Meetings' },
                        { value: 'Calls', label: 'Calls' },
                        { value: 'Emails', label: 'Emails' },
                        { value: 'Research', label: 'Research' },
                        { value: 'Writing', label: 'Writing' },
                    ]}
                />
                <Select
                    showSearch
                    placeholder="Select target"
                    // value={taskData.target}
                    // onChange={(value) => handleInputChange('target', value)}
                    options={[
                        { value: 'Day', label: 'Day' },
                        { value: 'Weekly', label: 'Weekly' },
                        { value: 'Monthly', label: 'Monthly' },
                        { value: 'Yearly', label: 'Yearly' },
                        { value: '10 Years', label: '10 Years' },
                    ]}
                />
                <Input placeholder='Search by title' />


            </div> */}

            <div className={styles.table}>
                <div className={styles.tableHead}>
                    <span>Title</span>
                    <span>Category</span>
                    <span>Priority</span>
                    <span>End</span>
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
                                <span>
                                    <CountdownTimer targetDate={el.endDate} />
                                </span>
                                <span>{el.target}</span>
                                <span>{el.completed ? "Completed" : "Pending"}</span>

                                <span className={styles.deleteIcon}>
                                    {
                                        el.completed ?
                                            <MdOutlineRemoveDone color='orange' onClick={() => updateTask(el._id, { completed: false })} />
                                            :
                                            <MdDoneAll color='green' onClick={() => updateTask(el._id, { completed: true })} />
                                    }
                                    <FiEdit color='#0373EA' onClick={() => navigate(`/editTasks/${el._id}`)} />
                                    <Delete id={el._id} /></span>
                            </div>
                        )
                    })
                }
            </div>


        </div>
    )
}

export default Tasks