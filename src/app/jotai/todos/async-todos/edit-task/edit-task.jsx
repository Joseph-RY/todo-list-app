"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAtom } from "jotai";
import { editTodoAtom } from "@/app/jotai/stores/async-store/async-store";

function CustomDialog({ open, onOpenChange, children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!open) return null;
  if (!mounted) return null;

  return createPortal(
    <div aria-modal="true" role="dialog" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => onOpenChange(false)}>
      <div className="bg-background rounded-lg p-6 max-w-lg w-full relative" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default function EditTask({ task }) {
  const [open, setOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [, editTodo] = useAtom(editTodoAtom);

  useEffect(() => {
    if (open) {
      setEditName(task.name || "");
      setEditDescription(task.description || "");
    }
  }, [open, task]);

  const handleEdit = async (e) => {
    e.preventDefault();
    const updatedTask = {
      id: task.id,
      name: editName,
      description: editDescription,
    };
    await editTodo(updatedTask);
    setEditName("");
    setEditDescription("");
    setOpen(false);
  };

  return (
    <div>
      <Button className="cursor-pointer" variant="secondary" size="sm" onClick={() => setOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
        </svg>
      </Button>
      <CustomDialog open={open} onOpenChange={setOpen}>
        <div className="flex flex-col gap-4">
          <header>
            <h2 className="text-lg font-semibold">Edit Task</h2>
            <p className="text-sm text-muted-foreground">Fill in the task details and add images.</p>
          </header>
          <form onSubmit={handleEdit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" value={editName} onChange={(e) => setEditName(e.target.value)} required autoFocus />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} required />
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Task</Button>
            </div>
          </form>
        </div>
      </CustomDialog>
    </div>
  );
}
