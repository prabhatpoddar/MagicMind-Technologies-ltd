import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, Select, message } from 'antd';
import styles from './styles.module.css';
import { createTaskData, updateTaskData } from '../../Redux/TasksReducer';
import { userRequest } from '../../requestMethod';
import { useNavigate, useParams } from 'react-router-dom';
const { TextArea } = Input;
const initialState = {
    title: '',
    startDate: '',
    endDate: '',
    priority: '',
    category: '',
    target: '',
    note: '',
}
const EditTasks = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [taskData, setTaskData] = useState(initialState);
    const { id } = useParams();

    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setTaskData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const getData = () => {
        userRequest.get(`api/task/getById/${id}`).then((res) => {
            setTaskData(res.data.data)
        }).catch((err) => {
            console.log('err:', err)
            message.error("Something went wrong")

        })
    }
    useEffect(() => {
        getData()
    }, [])
    const validateForm = () => {
        const newErrors = {};

        if (!taskData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!taskData.startDate) {
            newErrors.startDate = 'Start Date is required';
        }

        if (!taskData.endDate) {
            newErrors.endDate = 'End Date is required';
        }

        if (!taskData.priority) {
            newErrors.priority = 'Priority is required';
        }

        if (!taskData.category) {
            newErrors.category = 'Category is required';
        }

        if (!taskData.target) {
            newErrors.target = 'Target is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {

        if (validateForm()) {
            // Dispatch an action to add the task to the Redux store
            dispatch(updateTaskData(id, taskData)).then((res) => {
                navigate("/tasks")
                setTaskData(initialState);

                setErrors({});

                // Display success message
                message.success('Task updated successfully!');
            }).catch((err) => {
                console.log('err:', err)
            });

            // Reset the form after submitting

        } else {
            // Display error message
            message.error('Please fill in all required fields.');
        }
    };

    return (
        <div className={styles.MainContainer}>
            <div className={styles.heading}>
                <h1>Edit Your Task</h1>
            </div>

            <div className={styles.formDiv}>
                <div>
                    <span>
                        <p>Task Title *</p>
                        <Input
                            placeholder="Task Title"
                            value={taskData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                        />
                        {errors.title && <span className={styles.error}>{errors.title}</span>}
                    </span>
                    <span>
                        <p>End Date *</p>
                        <Input
                            placeholder="End Date"
                            type="date"
                            value={taskData.endDate}
                            onChange={(e) => handleInputChange('endDate', e.target.value)}
                        />
                        {errors.endDate && <span className={styles.error}>{errors.endDate}</span>}
                    </span>
                    <span>
                        <p>Priority Level *</p>
                        <Select
                            showSearch
                            placeholder="Select priority"
                            value={taskData.priority}
                            onChange={(value) => handleInputChange('priority', value)}
                            options={[
                                { value: 'High', label: 'High' },
                                { value: 'Low', label: 'Low' },
                                { value: 'Medium', label: 'Medium' },
                            ]}
                        />
                        {errors.priority && <span className={styles.error}>{errors.priority}</span>}
                    </span>
                </div>
                <div>
                    <span>
                        <p>Start Date *</p>
                        <Input
                            placeholder="Start Date"
                            type="date"
                            value={taskData.startDate}
                            onChange={(e) => handleInputChange('startDate', e.target.value)}
                        />
                        {errors.startDate && <span className={styles.error}>{errors.startDate}</span>}
                    </span>
                    <span>
                        <p>Category *</p>
                        <Select
                            showSearch
                            placeholder="Select category"
                            value={taskData.category}
                            onChange={(value) => handleInputChange('category', value)}
                            options={[
                                { value: 'Meetings', label: 'Meetings' },
                                { value: 'Calls', label: 'Calls' },
                                { value: 'Emails', label: 'Emails' },
                                { value: 'Research', label: 'Research' },
                                { value: 'Writing', label: 'Writing' },
                            ]}
                        />
                        {errors.category && <span className={styles.error}>{errors.category}</span>}
                    </span>
                    <span>
                        <p>Target *</p>
                        <Select
                            showSearch
                            placeholder="Select target"
                            value={taskData.target}
                            onChange={(value) => handleInputChange('target', value)}
                            options={[
                                { value: 'Day', label: 'Day' },
                                { value: 'Weekly', label: 'Weekly' },
                                { value: 'Monthly', label: 'Monthly' },
                                { value: 'Yearly', label: 'Yearly' },
                                { value: '10 Years', label: '10 Years' },
                            ]}
                        />
                        {errors.target && <span className={styles.error}>{errors.target}</span>}
                    </span>
                </div>
            </div>

            <div className={styles.bottomDiv}>
                <span>
                    <p>Note</p>
                    <TextArea
                        rows={6}
                        placeholder="Write Important Note"
                        maxLength={300}
                        value={taskData.note}
                        onChange={(e) => handleInputChange('note', e.target.value)}
                    />
                </span>
                <Button type="primary" size="large" onClick={handleSubmit}>
                    Save
                </Button>
            </div>
        </div>
    );
};

export default EditTasks;
