import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { Tabs, TabPanels, TabPanel, Button } from "@chakra-ui/react";
import PlayerTable from "./PlayerTable/PlayerTable";
import { useDispatch } from "react-redux";

import { Input, Select } from "antd";
import { FaPlus } from "react-icons/fa6";
import { fetchExpenseData } from "../../Redux/ExpanseReducer";
import { publicRequest } from "../../requestMethod";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
const Players = () => {
  const [selectedDates, setSelectedDates] = useState(null);
  console.log("selectedDates:", selectedDates);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expenseData, setExpenseData] = useState({
    type: "",
    start: "",
    end: "",
    category: "",
    subcategory: "",
    payment: "",
    amount: 0,
  });
  console.log("expenseData:", expenseData);

  const [filter, setFilter] = useState([]);
  const [category, setCategory] = useState([]);

  const [page, setPage] = useState(1);
  const [subcategory, setSubCategory] = useState(
    filter[expenseData?.category] || []
  );
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

    dispatch(fetchExpenseData(expenseData));
  }, [dispatch, page, expenseData]);
  const handleRangePickerChange = (dates, dateStrings) => {
    // dates[0] will be the start date and dates[1] will be the end date
    setExpenseData((prevState) => ({
      ...prevState,
      start: dates[0]?.format("YYYY-MM-DD") || "",
      end: dates[1]?.format("YYYY-MM-DD") || "",
    }));
    setSelectedDates(dates);
  };
  return (
    <div className={styles.MainContainer}>
      <div className={styles.topContainer}>
        <p>Expanse Detail</p>
        <Button colorScheme="linkedin" onClick={() => navigate("/addExpanse")}>
          {" "}
          <FaPlus /> Add Expanse
        </Button>
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
              <RangePicker
                variant="borderless"
                onChange={handleRangePickerChange}
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
