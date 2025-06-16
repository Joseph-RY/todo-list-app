import { createSlice } from "@reduxjs/toolkit";

export const syncTodoSlice = createSlice({
  name: "syncTodos",
  initialState: {
    data: [
      {
        id: 3001,
        isCompleted: false,
        images: [
          {
            id: 5011,
            imageName: "/task.webp",
          },
        ],
        name: "Morning Routine",
        description: "Go for a walk and do meditation.",
      },
      {
        id: 3002,
        isCompleted: true,
        images: [
          {
            id: 5012,
            imageName: "/task.webp",
          },
        ],
        name: "Grocery Shopping",
        description: "Buy fruits, vegetables, and dairy products.",
      },
      {
        id: 3003,
        isCompleted: false,
        images: [
          {
            id: 5013,
            imageName: "/task.webp",
          },
        ],
        name: "Read Book",
        description: "Finish the last two chapters of 'Atomic Habits'.",
      },
      {
        id: 3004,
        isCompleted: true,
        images: [
          {
            id: 5014,
            imageName: "/task.webp",
          },
        ],
        name: "Project Update",
        description: "Submit weekly progress report to the team lead.",
      },
      {
        id: 3005,
        isCompleted: false,
        images: [
          {
            id: 5015,
            imageName: "/task.webp",
          },
        ],
        name: "Fix Bug #142",
        description: "Resolve login issue on mobile devices.",
      },
    ],
  },
  reducers: {
    addTodos: (state, action) => {
      state.data.push(action.payload);
    },
    editTodos: (state, action) => {
      const index = state.data.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...action.payload,
        };
      }
    },
    deleteTodos: (state, action) => {
      state.data = state.data.filter((e) => e.id !== action.payload);
    },
    completeTodos: (state, action) => {
      const index = state.data.findIndex((e) => e.id === action.payload);
      if (index !== -1) {
        state.data[index].isCompleted = !state.data[index].isCompleted;
      }
    },
    addImage: (state, action) => {
      const { id, images } = action.payload;
      const todo = state.data.find((e) => e.id === id);
      if (todo) {
        todo.images.push(...images);
      }
    },
    deleteImage: (state, action) => {
      const { todoId, imageId } = action.payload;
      const todo = state.data.find((e) => e.id === todoId);
      if (todo) {
        todo.images = todo.images.filter((img) => img.id !== imageId);
      }
    },
  },
});

export const { addTodos, editTodos, deleteTodos, completeTodos, addImage, deleteImage } = syncTodoSlice.actions;

export default syncTodoSlice.reducer;
