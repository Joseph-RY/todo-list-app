import { configureStore } from "@reduxjs/toolkit";
import asyncTodoReducer from "./asyncTodoSlice";

export const store = configureStore({
  reducer: {
    asyncTodos: asyncTodoReducer,
  },
});
