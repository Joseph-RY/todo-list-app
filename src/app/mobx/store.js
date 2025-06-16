import { makeAutoObservable, runInAction, observable } from "mobx";
import axios from "axios";
import { API_URL } from "@/config/api";

class TodoStore {
  syncTodos = [
    {
      id: 3001,
      isCompleted: false,
      images: [{ id: 5011, imageName: "/task.webp" }],
      name: "Morning Routine",
      description: "Go for a walk and do meditation.",
    },
    {
      id: 3002,
      isCompleted: true,
      images: [{ id: 5012, imageName: "/task.webp" }],
      name: "Grocery Shopping",
      description: "Buy fruits, vegetables, and dairy products.",
    },
    {
      id: 3003,
      isCompleted: false,
      images: [{ id: 5013, imageName: "/task.webp" }],
      name: "Read Book",
      description: "Finish the last two chapters of 'Atomic Habits'.",
    },
    {
      id: 3004,
      isCompleted: true,
      images: [{ id: 5014, imageName: "/task.webp" }],
      name: "Project Update",
      description: "Submit weekly progress report to the team lead.",
    },
    {
      id: 3005,
      isCompleted: false,
      images: [{ id: 5015, imageName: "/task.webp" }],
      name: "Fix Bug #142",
      description: "Resolve login issue on mobile devices.",
    },
  ];

  asyncTodos = [];

  constructor() {
    makeAutoObservable(this, {
      asyncTodos: observable.ref,
    });
  }

  addSyncTodo(todo) {
    this.syncTodos.push(todo);
  }

  editSyncTodo(todo) {
    const idx = this.syncTodos.findIndex((t) => t.id === todo.id);
    if (idx !== -1) this.syncTodos[idx] = { ...this.syncTodos[idx], ...todo };
  }

  deleteSyncTodo(id) {
    this.syncTodos = this.syncTodos.filter((t) => t.id !== id);
  }

  toggleSyncComplete(id) {
    const todo = this.syncTodos.find((t) => t.id === id);
    if (todo) todo.isCompleted = !todo.isCompleted;
  }

  async fetchAsyncTodos() {
    try {
      const response = await axios.get(`${API_URL}/api/to-dos`);
      runInAction(() => {
        this.asyncTodos = response.data.data;
      });
    } catch (error) {
      console.error(error);
    }
  }

  async addAsyncTodo(newTodo) {
    try {
      await axios.post(`${API_URL}/api/to-dos`, newTodo, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await this.fetchAsyncTodos();
    } catch (error) {
      console.error(error);
    }
  }

  async editAsyncTodo(todo) {
    try {
      await axios.put(`${API_URL}/api/to-dos`, todo);
      await this.fetchAsyncTodos();
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAsyncTodo(id) {
    try {
      await axios.delete(`${API_URL}/api/to-dos?id=${id}`);
      await this.fetchAsyncTodos();
    } catch (error) {
      console.error(error);
    }
  }

  async toggleAsyncComplete(id) {
    try {
      await axios.put(`${API_URL}/completed?id=${id}`);
      await this.fetchAsyncTodos();
    } catch (error) {
      console.error(error);
    }
  }

  async addAsyncImage(id, formData) {
    try {
      await axios.post(`${API_URL}/api/to-dos/${id}/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await this.fetchAsyncTodos();
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAsyncImage(imageId) {
    try {
      await axios.delete(`${API_URL}/api/to-dos/images/${imageId}`);
      await this.fetchAsyncTodos();
    } catch (error) {
      console.error(error);
    }
  }
}

const todoStore = new TodoStore();
export default todoStore;
