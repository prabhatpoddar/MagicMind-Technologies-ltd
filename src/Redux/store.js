import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthReducer";
import tasksReducer from "./TasksReducer";
import expanseReducer from "./ExpanseReducer";


export default configureStore({
  reducer: {
    auth: authReducer,
    task: tasksReducer,
    expense: expanseReducer,

  },
});
