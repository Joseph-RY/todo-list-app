"use client";

import React from "react";
import { useSyncStore } from "../../stores/sync-store/store";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Check, Eye } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Image from "next/image";
import AddTask from "./add-task/add-task";
import EditTask from "./edit-task/edit-task";
import GetTask from "./get-task/get-task";

const SyncTodo = () => {
  const todos = useSyncStore((state) => state.data);
  const completeTodos = useSyncStore((state) => state.completeTodos);
  const deleteTodos = useSyncStore((state) => state.deleteTodos);

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5">
        <h2 className="text-2xl font-semibold text-center sm:text-left">Sync Todo List</h2>
        <AddTask />
      </div>

      <div className="hidden md:block overflow-x-auto rounded-xl border border-muted shadow-sm">
        <table className="min-w-[800px] w-full text-left text-sm sm:text-base border-separate border-spacing-0">
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
            {todos.map((todo) => (
              <tr key={todo.id} className="even:bg-muted/30 hover:bg-muted/40 transition-colors">
                <td className="px-4 py-3 border-t border-border">№ {todo.id}</td>
                <td className="px-4 py-3 border-t border-border">{todo.images?.[0]?.imageName ? <Image src={todo.images[0].imageName} alt="TodoImage" width={72} height={56} className="object-cover rounded-md shadow-sm" /> : <div className="w-18 h-14 bg-muted rounded-md" />}</td>
                <td className="px-4 py-3 border-t border-border">{todo.name}</td>
                <td className="px-4 py-3 border-t border-border text-muted-foreground">{todo.description}</td>
                <td className="px-4 py-3 border-t border-border text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${todo.isCompleted ? "bg-green-300 text-green-800" : "bg-destructive/10 text-destructive"}`}>{todo.isCompleted ? "Done" : "Undo"}</span>
                </td>
                <td className="px-4 py-3 border-t border-border">
                  <div className="flex justify-center gap-2 flex-wrap">
                    <Button variant="secondary" size="sm" onClick={() => completeTodos(todo.id)} aria-label="Complete Task">
                      <Check size={18} />
                    </Button>

                    <GetTask taskId={todo.id} />
                    <EditTask task={todo} />

                    <Button variant="secondary" size="sm" onClick={() => deleteTodos(todo.id)} aria-label="Delete Task">
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {todos.map((todo) => (
          <div key={todo.id} className="rounded-xl border border-border bg-muted/30 p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-foreground">ID: {todo.id}</h3>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${todo.isCompleted ? "bg-green-100 text-green-800" : "bg-destructive/10 text-destructive"}`}>{todo.isCompleted ? "Done" : "Undo"}</span>
            </div>

            <div>{todo.images?.[0]?.imageName ? <Image src={todo.images[0].imageName} alt="TodoImage" width={72} height={56} className="object-cover rounded-md shadow-sm" /> : <div className="w-18 h-14 bg-muted rounded-md" />}</div>

            <div className="space-y-1">
              <p className="font-medium text-foreground">Name: {todo.name}</p>
              <p className="text-sm text-muted-foreground">Description: {todo.description}</p>
            </div>

            <div className="pt-1">
              <p className="text-sm text-muted-foreground mb-2 font-medium">Actions:</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="ghost" size="icon" onClick={() => completeTodos(todo.id)} aria-label="Complete Task">
                  <Check size={18} />
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="View Task Details">
                      <Eye size={18} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-semibold">{todo.name}</DialogTitle>
                      <DialogDescription className="text-muted-foreground mt-2">
                        {todo.description}
                        {todo.images?.[0]?.imageName && <Image src={todo.images[0].imageName} alt="Task Image" width={300} height={200} className="mt-4 rounded-lg shadow" />}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                <Button variant="ghost" size="icon" disabled aria-label="Edit Task">
                  <Edit2 size={18} />
                </Button>

                <Button variant="ghost" size="icon" onClick={() => deleteTodos(todo.id)} aria-label="Delete Task">
                  <Trash2 size={18} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SyncTodo;
