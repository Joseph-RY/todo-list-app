import { configureStore } from "@reduxjs/toolkit";
import asyncTodoReducer from "./asyncTodoSlice";
import syncTodoReducer from "./syncTodoSlice";

export const store = configureStore({
  reducer: {
    asyncTodos: asyncTodoReducer,
    syncTodos: syncTodoReducer,
  },
});
