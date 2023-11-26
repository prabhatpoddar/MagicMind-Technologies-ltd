import React from "react";
import styles from "./style.module.css";
import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";

import { IoMdDoneAll } from "react-icons/io";
import { MdAddAlarm } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from 'react-icons/fi';
import { Dropdown } from 'antd';
import { Avatar } from '@chakra-ui/react';



import { Link, useLocation, } from "react-router-dom";
import Router from "../../Components/Router";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/AuthReducer";




const Home = () => {
    const location = useLocation().pathname;
    const dispatch = useDispatch()
    const Logout = () => {
        dispatch(logout())
        window.location.reload()
    }
    const items = [
        {
            label: <div className={styles.profileDetails}>
                <Avatar name='P' bg="blue.300" size="md" />
                <div className={styles.profilePic}>

                    <p style={{ fontWeight: "700" }}>Prabhat Poddar</p>
                    <p style={{ fontWeight: "500" }}>pk041222@gmail.com</p>
                </div>
            </div>,
            key: '0',
        },

        {
            type: 'divider',
        },
        {
            label: <span className={styles.logout} onClick={() => {
                dispatch(logout())
                window.location.reload()
            }}> <FiLogOut />
                Log Out</span>,
            key: '1',
        },
    ];
    return (
        <>
            <div className={styles.upperDiv}>
                <h1>Todo</h1>
                <span className={styles.headPhones}>
                    <Dropdown
                        menu={{
                            items,
                        }}
                    >
                        <CgProfile />
                    </Dropdown>
                </span>

            </div>
            <div className={styles.mainContainer}>
                <div className={styles.sideContainer}>


                    <div className={styles.listContainer}>

                        <Link to="/">
                            <div id={location === "/" ? styles.active : null}>
                                <MdDashboard className={styles.sideIcons} /> Dashboard
                            </div>
                        </Link>

                        <Link to="/tasks">
                            <div id={location === "/tasks" || location.startsWith("/editTasks/") ? styles.active : null}>
                                <FaTasks className={styles.sideIcons} /> All Tasks
                            </div>
                        </Link>

                        <Link to="/completed">
                            <div id={location === "/completed" ? styles.active : null}>
                                <IoMdDoneAll className={styles.sideIcons} /> Completed Tasks
                            </div>
                        </Link>

                        <Link to="/addTasks">
                            <div id={location === "/addTasks" ? styles.active : null}>
                                <MdAddAlarm className={styles.sideIcons} /> Add A Task
                            </div>
                        </Link>

                    </div>



                </div>
                <div>
                    <Router />
                </div>
            </div >
        </>
    );
};

export default Home;
