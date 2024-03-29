import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { MdDashboard } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from 'react-icons/fi';
import { Dropdown } from 'antd';
import { Avatar } from '@chakra-ui/react';
import { Link, useLocation, } from "react-router-dom";
import Router from "../../Components/Router";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/AuthReducer";
import { userRequest } from "../../requestMethod";
import DrawerList from "./Drawer";

const Home = () => {
    const location = useLocation().pathname;
    const dispatch = useDispatch()
    const [user, setUser] = useState("")
    useEffect(() => {
        userRequest.get('/api/user/getUser').then((res) => {
            setUser(res.data.data)
        }).catch((err) => {
            console.log('err:', err)

        })
    }, [])
    const Logout = () => {
        dispatch(logout())
        window.location.reload()
    }
    const items = [
        {
            label: <div className={styles.profileDetails}>
                <Avatar name={user.email} bg="blue.300" size="md"  />
                <div className={styles.profilePic}>

                    <p style={{ fontWeight: "700" }}>{user.name}</p>
                    <p style={{ fontWeight: "500" }}>{user.email}</p>
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
                <h1>Expanse</h1>
                <span className={styles.headPhones}>
                    <Dropdown
                        menu={{
                            items,
                        }}
                    >
                        <CgProfile />
                    </Dropdown>
                </span>
                <div className={styles.drawer}>
        <DrawerList user={user}/>
      </div>

            </div>
            <div className={styles.mainContainer}>
                <div className={styles.sideContainer}>


                    <div className={styles.listContainer}>

                        <Link to="/">
                            <div id={location === "/" ? styles.active : null}>
                                <MdDashboard className={styles.sideIcons} /> Dashboard
                            </div>
                        </Link>

                        {/* <Link to="/tasks">
                            <div id={location === "/tasks" || location.startsWith("/editTasks/") ? styles.active : null}>
                                <FaTasks className={styles.sideIcons} /> All Tasks
                            </div>
                        </Link> */}

                        <Link to="/addExpanse">
                            <div id={location === "/addExpanse" ? styles.active : null}>
                                <BsCurrencyDollar className={styles.sideIcons} /> Add Expanse
                            </div>
                        </Link> 
                        <Link to="/expense">
                            <div id={location === "/expense" ? styles.active : null}>
                                <BsCurrencyDollar className={styles.sideIcons} /> Expanse
                            </div>
                        </Link>
{/* 
                        <Link to="/addTasks">
                            <div id={location === "/addTasks" ? styles.active : null}>
                                <MdAddAlarm className={styles.sideIcons} /> Add Task
                            </div>
                        </Link> */}

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
