import { createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../requestMethod";

const initialState = {
  Task: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "Task",
  initialState,
  reducers: {
    getTaskDataRequest: (state) => {
      state.isLoading = true;
    },
    getTaskDataSuccess: (state, action) => {
      state.Task = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getTaskDataFailure: (state, action) => {
      state.Task = [];
      state.isLoading = false;
      state.error = action.payload;
    },
    createTaskDataRequest: (state) => {
      state.isLoading = true;
    },
    createTaskDataSuccess: (state, action) => {
      state.Task = [];
      state.isLoading = false;
      state.error = null;
    },
    createTaskDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateTaskDataRequest: (state) => {
      state.isLoading = true;
    },
    updateTaskDataSuccess: (state, action) => {
      state.Task = [];
      state.isLoading = false;
      state.error = null;
    },
    updateTaskDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getTaskDataRequest,
  getTaskDataSuccess,
  getTaskDataFailure,
  createTaskDataRequest,
  createTaskDataSuccess,
  createTaskDataFailure,
  updateTaskDataRequest,
  updateTaskDataSuccess,
  updateTaskDataFailure,
} = userSlice.actions;

export default userSlice.reducer;

export const fetchTaskData = () => async (dispatch) => {
  try {
    dispatch(getTaskDataRequest());
    const response = await userRequest.get(`/api/task/getAll`);
    dispatch(getTaskDataSuccess(response.data));
    return Promise.resolve(response.data);
  } catch (error) {
    dispatch(getTaskDataFailure(error.message));
    return Promise.reject(error.message);
  }
};

export const createTaskData = (data) => async (dispatch) => {
  try {
    dispatch(createTaskDataRequest());
    const res = await userRequest.post("/api/task/create", data);
    dispatch(createTaskDataSuccess(res.data));
    return Promise.resolve(res.data);
  } catch (error) {
    dispatch(createTaskDataFailure(error.message));
    return Promise.reject(error.message);
  }
};

export const updateTaskData = (id, data) => async (dispatch) => {
  try {
    dispatch(updateTaskDataRequest());
    const res = await userRequest.put(`/api/task/update/${id}`, data);
    dispatch(updateTaskDataSuccess(res.data));
    return Promise.resolve(res.data);
  } catch (error) {
    dispatch(updateTaskDataFailure(error.message));
    return Promise.reject(error.message);
  }
};
