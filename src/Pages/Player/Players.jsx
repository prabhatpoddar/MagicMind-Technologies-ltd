import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import PlayerTable from "./PlayerTable/PlayerTable";
// import TeamTable from './TeamTable/TeamTable';
import { useDispatch, useSelector } from "react-redux";

import { Button, Input, Select } from "antd";
import { FaPlus } from "react-icons/fa6";
import { fetchExpenseData } from "../../Redux/ExpanseReducer";
import { publicRequest } from "../../requestMethod";
const initialState = {
  type: "",
  date: "",
  category: "",
  subcategory: "",
  payment: "",
  amount: 0,
  note: "",
};
const Players = () => {
  const [expenseData, setExpenseData] = useState(initialState);
  const [filter, setFilter] = useState([]);
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [subcategory, setSubCategory] = useState(
    filter[expenseData?.category] || []
  );
  const [type, setType] = useState("Player");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const handleInputChange = (field, value) => {
    setExpenseData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const getCategory = () => {
    publicRequest
      .get(`/api/filter/getAll`)
      .then((res) => {
        setFilter(res.data.Category);
        setCategory(
          Object.entries(res.data.Category).map(([key, value]) => ({
            value: key,
            label: key,
          }))
        );
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };
  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    // Fetch data based on type (Player or Team)
    if (type === "Player") {
      dispatch(fetchExpenseData(true));
    }
  }, [dispatch, type, page, search]);

  return (
    <div className={styles.MainContainer}>
      <div className={styles.topContainer}>
        <p>Expanse Detail</p>
       <Button>Add Expanse</Button>
      </div>
      <div>
        <Tabs>
          <div className={styles.topSearch}>
            <div className={styles.searchBar}>
              <Select
                placeholder="Type"
                value={expenseData.type ? expenseData.type : []}
                onChange={(e) => handleInputChange("type", e)}
                options={[
                  {
                    value: "Credit",
                    label: "Credit",
                  },
                  {
                    value: "Debit",
                    label: "Debit",
                  },
                  {
                    value: "Lending",
                    label: "Lending",
                  },
                  {
                    value: "Borrowing",
                    label: "Borrowing",
                  },
                ]}
              />
            </div>
            <div className={styles.searchBar}>
              <Select
                value={expenseData.category ? expenseData.category : []}
                placeholder="Category"
                onChange={(e) => {
                  handleInputChange("category", e);
                  setSubCategory(filter[e]);
                }}
                options={category}
              />
            </div>
            <div className={styles.searchBar}>
              <Select
                value={expenseData.subcategory ? expenseData.subcategory : []}
                placeholder="Subcategory"
                onChange={(e) => handleInputChange("subcategory", e)}
                options={subcategory.map((el) => {
                  return { label: el, value: el };
                })}
              />
            </div>
            <div className={styles.searchBar}>
              <Select
                value={expenseData.payment ? expenseData.payment : []}
                placeholder="Payment Method"
                onChange={(e) => handleInputChange("payment", e)}
                options={[
                  {
                    value: "Bank",
                    label: "Bank",
                  },
                  {
                    value: "Cash",
                    label: "Cash",
                  },
                  {
                    value: "Card",
                    label: "Card",
                  },
                ]}
              />
            </div>
            <div className={styles.searchBar}>
              <Select
                placeholder="Year"
                value={expenseData.year || []}
                onChange={(value) => handleInputChange("year", value)}
                options={[
                  { label: "2022", value: "2022" },
                  { label: "2023", value: "2023" },
                  { label: "2024", value: "2024" },
                  // Add more years as needed
                ]}
              />
            </div>
            <div className={styles.searchBar}>
              <Select
                placeholder="Month"
                value={expenseData.month || []}
                onChange={(value) => handleInputChange("month", value)}
                options={[
                  { label: "January", value: "01" },
                  { label: "February", value: "02" },
                  { label: "March", value: "03" },
                  { label: "April", value: "04" },
                  { label: "May", value: "05" },
                  { label: "June", value: "06" },
                  { label: "July", value: "07" },
                  { label: "August", value: "08" },
                  { label: "September", value: "09" },
                  { label: "October", value: "10" },
                  { label: "November", value: "11" },
                  { label: "December", value: "12" },
                ]}
              />
            </div>
            <div className={styles.searchBar}>
              <Input
                placeholder="Amount"
                type="number"
                value={expenseData.amount || ""}
                onChange={(e) => handleInputChange("amount", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.listDiv}>
            <TabPanels>
              <TabPanel>
                <PlayerTable page={page} />
              </TabPanel>
              <TabPanel>
                {/* <TeamTable teams={teams} page={page} /> */}
              </TabPanel>
            </TabPanels>
          </div>
        </Tabs>
      </div>
      <div className={styles.footer}>
        <div className={styles.btnDiv}></div>
        <div className={styles.btnDiv}>
          <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </Button>
          <button
            onClick={() => setPage(page + 1)}
            className={styles.topBtns}
            disabled={page === 10}
          >
            Next
          </button>
        </div>
        <div className={styles.btnDiv2}>
          <Button>{page}</Button>
          <Button disabled>of {10}</Button>
        </div>
      </div>
    </div>
  );
};

export default Players;
