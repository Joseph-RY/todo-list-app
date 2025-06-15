"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { addTodos } from "@/app/redux-toolkit/syncTodoSlice";

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

export default function AddTask() {
  const [open, setOpen] = useState(false);
  const [addName, setAddName] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [addImage, setAddImage] = useState([]);
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();
    const newUser = new FormData();
    newUser.append("Name", addName);
    newUser.append("Description", addDescription);
    for (let i = 0; i < addImage.length; i++) {
      newUser.append("Images", addImage[i]);
    }
    dispatch(addTodos(newUser));
    setAddName("");
    setAddDescription("");
    setAddImage([]);
    setOpen(false);
  };

  const handleFileChange = (e) => {
    setAddImage(Array.from(e.target.files));
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>+ Add Task</Button>

      <CustomDialog open={open} onOpenChange={setOpen}>
        <div className="flex flex-col gap-4">
          <header>
            <h2 className="text-lg font-semibold">Add New Task</h2>
            <p className="text-sm text-muted-foreground">Fill in the task details and add images.</p>
          </header>
          <form onSubmit={handleAdd} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" value={addName} onChange={(e) => setAddName(e.target.value)} required autoFocus />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" type="text" value={addDescription} onChange={(e) => setAddDescription(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="images">Images</Label>
              <Input id="images" type="file" multiple accept="image/*" onChange={handleFileChange} />
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
