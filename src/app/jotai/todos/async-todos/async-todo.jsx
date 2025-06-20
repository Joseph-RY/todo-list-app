"use client";

import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { asyncTodosAtom, getTodosAtom, deleteTodoAtom, completeTodoAtom } from "@/app/jotai/stores/async-store/async-store";
import { API_URL } from "@/config/api";
import { Button } from "@/components/ui/button";
import AddTask from "./add-task/add-task";
import EditTask from "./edit-task/edit-task";
import GetTask from "./get-task/get-task";
import ImagesPopover from "./images-popover/images-popover";

const AsyncTodo = () => {
  const [todos, setTodos] = useAtom(asyncTodosAtom);
  const [, fetchTodos] = useAtom(getTodosAtom);
  const [, deleteTodo] = useAtom(deleteTodoAtom);
  const [, completeTodo] = useAtom(completeTodoAtom);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5">
        <h2 className="text-2xl font-semibold text-center sm:text-left">Async Todo List</h2>
        <AddTask />
      </div>
      <div className="hidden md:block overflow-x-auto rounded-xl border border-muted shadow-sm">
        <table className="min-w-[900px] w-full text-left text-sm sm:text-base border-separate border-spacing-0">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium border-b border-border">ID</th>
              <th className="px-4 py-3 font-medium border-b border-border">Image</th>
              <th className="px-4 py-3 font-medium border-b border-border">Name</th>
              <th className="px-4 py-3 font-medium border-b border-border">Description</th>
              <th className="px-4 py-3 font-medium text-center border-b border-border">Completed</th>
              <th className="px-4 py-3 font-medium text-center border-b border-border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((e) => (
              <tr key={e.id} className="even:bg-muted/30 hover:bg-muted/40 transition-colors">
                <td className="px-4 py-3 border-t border-border">№ {e.id}</td>
                <td className="px-4 py-3 border-t border-border">
                  <img src={`${API_URL}/images/${e.images[0]?.imageName}`} alt="TodosImage" className="w-18 h-14 object-cover rounded-md shadow-sm" />
                </td>
                <td className="px-4 py-3 border-t border-border">{e.name}</td>
                <td className="px-4 py-3 border-t border-border text-muted-foreground">{e.description}</td>
                <td className="px-4 py-3 border-t border-border text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${e.isCompleted ? "bg-green-300 text-green-800" : "bg-destructive/10 text-destructive"}`}>{e.isCompleted ? "Done" : "Undo"}</span>
                </td>
                <td className="px-4 py-3 border-t border-border">
                  <div className="flex justify-center gap-2 flex-wrap">
                    <EditTask task={e} />
                    <Button className="cursor- h-9" variant="secondary" size="sm" onClick={() => deleteTodo(e.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93ZM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 0 1 3.75 21Z" />
                      </svg>
                    </Button>
                    <GetTask task={e} />
                    <ImagesPopover id={e.id} />
                    <Button className="cursor- h-9" variant="secondary" size="sm" onClick={() => completeTodo(e.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {todos.map((e) => (
          <div key={e.id} className="rounded-xl border border-border bg-muted/30 p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-foreground">ID: {e.id}</h3>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${e.isCompleted ? "bg-green-100 text-green-800" : "bg-destructive/10 text-destructive"}`}>{e.isCompleted ? "Done" : "Undo"}</span>
            </div>
            <div>
              <img src={`${API_URL}/images/${e.images[0]?.imageName}`} alt="TodosImage" className="w-full h-40 object-cover rounded-md" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-foreground">Name: {e.name}</p>
              <p className="text-sm text-muted-foreground">Description: {e.description}</p>
            </div>
            <div className="pt-1">
              <p className="text-sm text-muted-foreground mb-2 font-medium">Actions:</p>
              <div className="flex flex-wrap gap-2">
                <EditTask task={e} />
                <Button className="cursor-pointer h-9" variant="secondary" size="sm" onClick={() => deleteTodo(e.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93ZM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 0 1 3.75 21Z" />
                  </svg>
                </Button>
                <GetTask task={e} />
                <ImagesPopover id={e.id} />
                <Button className="cursor-pointer h-9" variant="secondary" size="sm" onClick={() => completeTodo(e.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AsyncTodo;
