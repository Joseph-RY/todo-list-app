import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/config/api";

export const getTodos = createAsyncThunk("async/getTodos", async () => {
  const response = await axios.get(`${API_URL}/api/to-dos`);
  return response.data.data;
});

export const deleteTodos = createAsyncThunk("async/deleteTodos", async (id) => {
  await axios.delete(`${API_URL}/api/to-dos?id=${id}`);
  return id;
});

export const completeTodos = createAsyncThunk("async/completeTodos", async (id) => {
  await axios.put(`${API_URL}/completed?id=${id}`);
  return id;
});

export const addTodos = createAsyncThunk("async/addTodos", async (newTodos, { dispatch }) => {
  await axios.post(`${API_URL}/api/to-dos`, newTodos, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  dispatch(getTodos());
});

export const editTodos = createAsyncThunk("async/editTodos", async (updTodos, { dispatch }) => {
  await axios.put(`${API_URL}/api/to-dos`, updTodos);
  dispatch(getTodos());
});

export const addImage = createAsyncThunk("async/addImage", async ({ id, formData }, { dispatch }) => {
  await axios.post(`${API_URL}/api/to-dos/${id}/images`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  dispatch(getTodos());
});

export const deleteImage = createAsyncThunk("async/deleteImage", async (id, { dispatch }) => {
  await axios.delete(`${API_URL}/api/to-dos/images/${id}`);
  dispatch(getTodos());
});

export const asyncTodoSlice = createSlice({
  name: "asyncTodos",
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.data = state.data.filter((e) => e.id != action.payload);
      })
      .addCase(completeTodos.fulfilled, (state, action) => {
        const id = action.payload;

        state.data = state.data.map((e) => {
          if (e.id == id) {
            const updTodos = {
              ...e,
              isCompleted: !e.isCompleted,
            };
            return updTodos;
          }
          return e;
        });
      })
      .addCase(addTodos.fulfilled, (state, action) => {})
      .addCase(editTodos.fulfilled, (state, action) => {});
  },
});

export default asyncTodoSlice.reducer;
