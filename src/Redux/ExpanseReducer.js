import { createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../requestMethod";

const initialState = {
  Expense: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "Expense",
  initialState,
  reducers: {
    getExpenseDataRequest: (state) => {
      state.isLoading = true;
    },
    getExpenseDataSuccess: (state, action) => {
      state.Expense = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getExpenseDataFailure: (state, action) => {
      state.Expense = [];
      state.isLoading = false;
      state.error = action.payload;
    },
    createExpenseDataRequest: (state) => {
      state.isLoading = true;
    },
    createExpenseDataSuccess: (state, action) => {
      state.Expense = [];
      state.isLoading = false;
      state.error = null;
    },
    createExpenseDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateExpenseDataRequest: (state) => {
      state.isLoading = true;
    },
    updateExpenseDataSuccess: (state, action) => {
      state.Expense = [];
      state.isLoading = false;
      state.error = null;
    },
    updateExpenseDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getExpenseDataRequest,
  getExpenseDataSuccess,
  getExpenseDataFailure,
  createExpenseDataRequest,
  createExpenseDataSuccess,
  createExpenseDataFailure,
  updateExpenseDataRequest,
  updateExpenseDataSuccess,
  updateExpenseDataFailure,
} = userSlice.actions;

export default userSlice.reducer;

export const fetchExpenseData = (data) => async (dispatch) => {
  try {
    dispatch(getExpenseDataRequest());
    const response = await userRequest.post(`/api/expanse/getAll`,data);
    dispatch(getExpenseDataSuccess(response.data));
    return Promise.resolve(response.data);
  } catch (error) {
    dispatch(getExpenseDataFailure(error.message));
    return Promise.reject(error.message);
  }
};

export const createExpenseData = (data) => async (dispatch) => {
  try {
    dispatch(createExpenseDataRequest());
    const res = await userRequest.post("/api/expanse/create", data);
    dispatch(createExpenseDataSuccess(res.data));
    return Promise.resolve(res.data);
  } catch (error) {
    dispatch(createExpenseDataFailure(error.message));
    return Promise.reject(error.message);
  }
};

export const updateExpenseData = (id, data) => async (dispatch) => {
  try {
    dispatch(updateExpenseDataRequest());
    const res = await userRequest.put(`/api/expense/update/${id}`, data);
    dispatch(updateExpenseDataSuccess(res.data));
    return Promise.resolve(res.data);
  } catch (error) {
    dispatch(updateExpenseDataFailure(error.message));
    return Promise.reject(error.message);
  }
};
