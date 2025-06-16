import { atom } from "jotai";
import axios from "axios";
import { API_URL } from "@/config/api";

export const asyncTodosAtom = atom([]);
export const openTaskIdAtom = atom(null);

const fetchTodos = async (set) => {
  try {
    const res = await axios.get(`${API_URL}/api/to-dos`);
    set(asyncTodosAtom, res.data.data);
  } catch (err) {
    console.error("getTodos error:", err);
  }
};

export const getTodosAtom = atom(null, async (get, set) => {
  await fetchTodos(set);
});

export const deleteTodoAtom = atom(null, async (get, set, id) => {
  try {
    await axios.delete(`${API_URL}/api/to-dos?id=${id}`);
    await fetchTodos(set);
  } catch (err) {
    console.error("deleteTodos error:", err);
  }
});

export const completeTodoAtom = atom(null, async (get, set, id) => {
  try {
    await axios.put(`${API_URL}/completed?id=${id}`);
    await fetchTodos(set);
  } catch (err) {
    console.error("completeTodos error:", err);
  }
});

export const addTodoAtom = atom(null, async (get, set, newTodo) => {
  try {
    await axios.post(`${API_URL}/api/to-dos`, newTodo, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    await fetchTodos(set);
  } catch (err) {
    console.error("addTodos error:", err);
  }
});

export const editTodoAtom = atom(null, async (get, set, updatedTodo) => {
  try {
    await axios.put(`${API_URL}/api/to-dos`, updatedTodo);
    await fetchTodos(set);
  } catch (err) {
    console.error("editTodos error:", err);
  }
});

export const addImageAtom = atom(null, async (get, set, { id, formData }) => {
  try {
    await axios.post(`${API_URL}/api/to-dos/${id}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    await fetchTodos(set);
  } catch (err) {
    console.error("addImage error:", err);
  }
});

export const deleteImageAtom = atom(null, async (get, set, id) => {
  try {
    await axios.delete(`${API_URL}/api/to-dos/images/${id}`);
    await fetchTodos(set);
  } catch (err) {
    console.error("deleteImage error:", err);
  }
});
