import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthReducer";
import tasksReducer from "./TasksReducer";


export default configureStore({
  reducer: {
    auth: authReducer,
    task: tasksReducer,

  },
});
