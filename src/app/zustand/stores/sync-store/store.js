import { create } from 'zustand'

export const useSyncStore = create((set) => ({
    data: [
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
    ],

    addTodos: (todo) =>
        set((state) => ({
            data: [...state.data, todo],
        })),

    editTodos: (updatedTodo) =>
        set((state) => ({
            data: state.data.map((todo) =>
                todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
            ),
        })),

    deleteTodos: (id) =>
        set((state) => ({
            data: state.data.filter((todo) => todo.id !== id),
        })),

    completeTodos: (id) =>
        set((state) => ({
            data: state.data.map((todo) =>
                todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
            ),
        })),

    addImage: ({ id, images }) =>
        set((state) => ({
            data: state.data.map((todo) =>
                todo.id === id
                    ? { ...todo, images: [...todo.images, ...images] }
                    : todo
            ),
        })),

    deleteImage: ({ todoId, imageId }) =>
        set((state) => ({
            data: state.data.map((todo) =>
                todo.id === todoId
                    ? {
                        ...todo,
                        images: todo.images.filter((img) => img.id !== imageId),
                    }
                    : todo
            ),
        })),
}))
