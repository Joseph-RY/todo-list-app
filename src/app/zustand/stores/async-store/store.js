// zustand/asyncTodoStore.js
import { create } from 'zustand'
import axios from 'axios'
import { API_URL } from '@/config/api'

export const useAsyncTodoStore = create((set, get) => ({
    data: [],

    getTodos: async () => {
        try {
            const res = await axios.get(`${API_URL}/api/to-dos`);
            set({ data: res.data.data });
        } catch (error) {
            console.error('getTodos error:', error);
        }
    },

    deleteTodos: async (id) => {
        try {
            await axios.delete(`${API_URL}/api/to-dos?id=${id}`);
            set((state) => ({ data: state.data.filter((e) => e.id !== id) }));
        } catch (error) {
            console.error('deleteTodos error:', error);
        }
    },

    completeTodos: async (id) => {
        try {
            await axios.put(`${API_URL}/completed?id=${id}`);
            set((state) => ({
                data: state.data.map((e) =>
                    e.id === id ? { ...e, isCompleted: !e.isCompleted } : e
                ),
            }));
        } catch (error) {
            console.error('completeTodos error:', error);
        }
    },

    addTodos: async (newTodos) => {
        try {
            await axios.post(`${API_URL}/api/to-dos`, newTodos, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            await get().getTodos();
        } catch (error) {
            console.error('addTodos error:', error);
        }
    },

    editTodos: async (updTodos) => {
        try {
            await axios.put(`${API_URL}/api/to-dos`, updTodos);
            await get().getTodos();
        } catch (error) {
            console.error('editTodos error:', error);
        }
    },

    addImage: async ({ id, formData }) => {
        try {
            await axios.post(`${API_URL}/api/to-dos/${id}/images`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            await get().getTodos();
        } catch (error) {
            console.error('addImage error:', error);
        }
    },

    deleteImage: async (id) => {
        try {
            await axios.delete(`${API_URL}/api/to-dos/images/${id}`);
            await get().getTodos();
        } catch (error) {
            console.error('deleteImage error:', error);
        }
    },
}));
