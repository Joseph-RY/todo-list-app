import { configureStore } from "@reduxjs/toolkit";
import asyncTodoReducer from "./stores/asyncTodoSlice";
import syncTodoReducer from "./stores/syncTodoSlice";

export const store = configureStore({
  reducer: {
    asyncTodos: asyncTodoReducer,
    syncTodos: syncTodoReducer,
  },
});
