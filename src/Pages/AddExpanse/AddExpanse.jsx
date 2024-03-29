import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {  Input, Select, message } from "antd";
import styles from "./styles.module.css";
import { publicRequest, userRequest } from "../../requestMethod";
import { createExpenseData } from "../../Redux/ExpanseReducer";
import { Button } from "@chakra-ui/react";
const { TextArea } = Input;

const initialState = {
  type: "",
  date: "",
  category: "",
  subcategory: "",
  payment: "",
  amount: 0,
  note: "",
};

const AddExpense = () => {
  const dispatch = useDispatch();
  const [expenseData, setExpenseData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [filter, setFilter] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const validateForm = () => {
    const newErrors = {};

    if (!expenseData.type.trim()) {
      newErrors.type = "Type is required";
    }

    if (!expenseData.date) {
      newErrors.date = "Date is required";
    }

    if (!expenseData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!expenseData.subcategory.trim()) {
      newErrors.subcategory = "Subcategory is required";
    }

    if (!expenseData.payment.trim()) {
      newErrors.payment = "Payment is required";
    }

    if (expenseData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setLoading(true);
      dispatch(createExpenseData(expenseData))
        .then((res) => {
          setLoading(false);
          setExpenseData(initialState);
          setErrors({});
          message.success("Expense added successfully!");
        })
        .catch((err) => {
          console.log("err:", err);
        });
    } else {
      message.error("Please fill in all required fields.");
    }
  };

  return (
    <div className={styles.MainContainer}>
      <div className={styles.heading}>
        <h1>Create Your Expense</h1>
      </div>

      <div className={styles.formDiv}>
        <div>
          <span>
            <p>Type *</p>
            <Select
              size="large"
              placeholder="Expense Type"
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
            {errors.type && <span className={styles.error}>{errors.type}</span>}
          </span>
          <span>
            <p>Date *</p>
            <Input
              size="large"
              placeholder="Expense Date"
              type="date"
              value={expenseData.date ? expenseData.date : ""}
              onChange={(e) => handleInputChange("date", e.target.value)}
            />
            {errors.date && <span className={styles.error}>{errors.date}</span>}
          </span>
          <span>
            <p>Category *</p>
            <Select
              size="large"
              value={expenseData.category ? expenseData.category : []}
              placeholder="Expense Category"
              onChange={(e) => {
                handleInputChange("category", e);
                setSubCategory(filter[e]);
              }}
              options={category}
            />
            {errors.category && (
              <span className={styles.error}>{errors.category}</span>
            )}
          </span>
        </div>
        <div>
          <span>
            <p>Subcategory *</p>
            <Select
              size="large"
              value={expenseData.subcategory ? expenseData.subcategory : []}
              placeholder="Expense Subcategory"
              onChange={(e) => handleInputChange("subcategory", e)}
              options={subcategory.map((el) => {
                return { label: el, value: el };
              })}
            />
            {errors.subcategory && (
              <span className={styles.error}>{errors.subcategory}</span>
            )}
          </span>
          <span>
            <p>Payment *</p>
            <Select
              size="large"
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
            {errors.payment && (
              <span className={styles.error}>{errors.payment}</span>
            )}
          </span>
          <span>
            <p>Amount *</p>
            <Input
              size="large"
              placeholder="Expense Amount"
              type="number"
              value={expenseData.amount || ""}
              onChange={(e) => handleInputChange("amount", e.target.value)}
            />
            {errors.amount && (
              <span className={styles.error}>{errors.amount}</span>
            )}
          </span>
        </div>
      </div>

      <div className={styles.bottomDiv}>
        <span>
          <p>Note *</p>
          <TextArea
            rows={5}
            placeholder="Write Important Note"
            maxLength={300}
            value={expenseData.note}
            onChange={(e) => handleInputChange("note", e.target.value)}
          />
          {errors.note && <span className={styles.error}>{errors.note}</span>}
        </span>
        <Button
          isLoading={loading}
          colorScheme='messenger'
          onClick={handleSubmit}
        >
          Add Expense
        </Button>
      </div>
    </div>
  );
};

export default AddExpense;
