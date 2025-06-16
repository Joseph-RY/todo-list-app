import { atom, useAtom } from "jotai";

const initialTodos = [
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

export const todosAtom = atom(initialTodos);

export const useAddTodo = () => {
  const [, setTodos] = useAtom(todosAtom);
  return (newTodo) => {
    setTodos((todos) => [...todos, newTodo]);
  };
};

export const useEditTodo = () => {
  const [, setTodos] = useAtom(todosAtom);
  return (updatedTodo) => {
    setTodos((todos) => todos.map((todo) => (todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo)));
  };
};

export const useDeleteTodo = () => {
  const [, setTodos] = useAtom(todosAtom);
  return (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };
};

export const useToggleComplete = () => {
  const [, setTodos] = useAtom(todosAtom);
  return (id) => {
    setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)));
  };
};

export const useAddImage = () => {
  const [, setTodos] = useAtom(todosAtom);
  return ({ id, images }) => {
    setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo, images: [...todo.images, ...images] } : todo)));
  };
};

export const useDeleteImage = () => {
  const [, setTodos] = useAtom(todosAtom);
  return ({ todoId, imageId }) => {
    setTodos((todos) => todos.map((todo) => (todo.id === todoId ? { ...todo, images: todo.images.filter((img) => img.id !== imageId) } : todo)));
  };
};
