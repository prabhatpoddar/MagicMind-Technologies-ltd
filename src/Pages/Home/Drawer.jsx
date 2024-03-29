import React, { useState } from "react";
import { Avatar, Drawer, Dropdown } from "antd";
import { IoMenu } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/AuthReducer";

const DrawerList = ({ user }) => {
  const navigate = useNavigate();
  const page = useLocation().pathname;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const items = [
    {
      label: (
        <div className={styles.profileDetails}>
          <Avatar name={user.email} bg="blue.300" size="md" />
          <div className={styles.profilePic}>
            <p style={{ fontWeight: "700" }}>{user.name}</p>
            <p style={{ fontWeight: "500" }}>{user.email}</p>
          </div>
        </div>
      ),
      key: "0",
    },

    {
      type: "divider",
    },
    {
      label: (
        <span
          className={styles.logout}
          onClick={() => {
            dispatch(logout());
            window.location.reload();
          }}
        >
          {" "}
          <FiLogOut />
          Log Out
        </span>
      ),
      key: "1",
    },
  ];
  return (
    <>
      <span onClick={showDrawer}>
        <IoMenu fontSize={40} />
      </span>
      <Drawer
        placement="left"
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <div>
            <span className={styles.headPhones2}>
              <Dropdown
                menu={{
                  items,
                }}
              >
                <CgProfile />
              </Dropdown>
            </span>
          </div>
        }
      >
        <div className={styles.list2}>
          {/* <span
            onClick={() => {
              navigate("/");
              setOpen(false);
            }}
            id={page === "/" ? styles.active2 : null}
          >
            HOME
          </span> */}
          <span
            onClick={() => {
              navigate("/");
              setOpen(false);
            }}
            id={page === "/" ? styles.active2 : null}
          >
            Add Expense
          </span>

          <span
            onClick={() => {
              navigate("/addTasks");
              setOpen(false);
            }}
            id={page === "/addTasks" ? styles.active2 : null}
          >
            Add Tasks
          </span>
        </div>
      </Drawer>
    </>
  );
};
export default DrawerList;
