import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { publicRequest } from "../requestMethod";

const initialState = {
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
      document.cookie = `token=${action.payload.token}; path=/; SameSite=Strict; Secure`;
      localStorage.setItem("userId", JSON.stringify(action.payload?.user?._id));
      localStorage.setItem(
        "userName",
        JSON.stringify(
          action.payload?.user?.fullName + " " + action.payload?.user?.lastName
        )
      );
      localStorage.setItem(
        "userData",
        JSON.stringify(
          action.payload?.user
        )
      );
     
    },
    loginFailure: (state, action) => {
      state.token = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = action.payload;
      //   alert(action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    publicRequest
      .post("/api/auth/login", JSON.stringify(credentials))
      .then((res) => {
        if (res.data) {
          dispatch(loginSuccess(res.data));
          message.success("Login Successfully");
          return res.data;
        }
      })
      .catch((err) => {
        console.log("err:", err);
        dispatch(loginFailure(err.response.data.error));
        message.error(err.response.data.error);
        return err.response.data.error;
      });
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
