import React from 'react'
import styles from "./styles.module.css"
import { Avatar } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
// import { fetchPlayerData, updatePlayerData } from '../../../Redux/PlayerReducer';
// // import Delete from '../../../Components/Delete';
// import { FiEdit } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';
const PlayerTable = ({  page }) => {
    // const navigate = useNavigate()
    // const dispatch = useDispatch()
    const tasks = useSelector(store => store.expense.Expense.data) || []
    // const deleteTask = (id, data) => {
    //     dispatch(updatePlayerData(id, data)).then((res) => {
    //         dispatch(fetchPlayerData(page, 10, true)).then((res2) => {
    //             message.success("Delete Successfully")
    //         }).catch((err) => {
    //             message.error("Something went wrong")
    //         })
    //     }).catch((err) => {
    //         message.error("Something went wrong")
    //     })
    // }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    };

    function shortenText(inputText, maxLength) {
        if (inputText.length > maxLength) {
            const shortenedText = inputText.substring(0, maxLength);
            const lastSpaceIndex = shortenedText.lastIndexOf(' ');
            if (lastSpaceIndex !== -1) {
                return shortenedText.substring(0, lastSpaceIndex) + " " + '...';
            } else {
                return shortenedText + " " + '...';
            }
        } else {
            return inputText;
        }
    }



    return (
        <div className={styles.table}>
        <div className={styles.tableHead}>
            <span>Type</span>
            <span>Category</span>
            <span>Sub Category</span>
            <span>Method</span>
            <span>Date</span>
            <span>Amount</span>
           
        </div>
        {
            tasks.map((el) => {
                return (
                    <div className={styles.tableData} key={el._id}>

                        <span>{el.type}</span>
                        <span>{el.category}</span>
                        <span>{el.subcategory}</span>
                        <span>{el.payment}</span>
                        <span>{formatDate(el.date)}</span>
                        <span>{el.amount}</span>
                       

                    </div>
                )
            })
        }
    </div>
    )
}

export default PlayerTable