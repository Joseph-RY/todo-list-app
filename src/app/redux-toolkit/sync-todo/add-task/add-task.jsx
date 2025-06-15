"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
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
  const [imageLinks, setImageLinks] = useState([]);
  const [newImageLink, setNewImageLink] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.syncTodos.data);

  const handleAdd = (e) => {
    e.preventDefault();

    if (!addName.trim() || !addDescription.trim()) return;

    dispatch(
      addTodos({
        id: data.length + 3001,
        name: addName,
        description: addDescription,
        images: imageLinks,
      })
    );

    setAddName("");
    setAddDescription("");
    setImageLinks([]);
    setNewImageLink("");
    setOpen(false);
  };

  const handleAddImageLink = () => {
    if (newImageLink.trim()) {
      setImageLinks((prev) => [...prev, { id: prev.length, imageName: newImageLink.trim() }]);
      setNewImageLink("");
    }
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
              <Label htmlFor="images">Image Links</Label>
              <div className="flex gap-2">
                <Input id="images" type="text" placeholder="https://example.com/image.jpg" value={newImageLink} onChange={(e) => setNewImageLink(e.target.value)} />
                <Button type="button" onClick={handleAddImageLink}>
                  Add
                </Button>
              </div>
              {imageLinks.length > 0 && (
                <ul className="list-disc pl-5 text-sm text-muted-foreground mt-2">
                  {imageLinks.map((linkObj, index) => (
                    <li key={index}>{linkObj.imageName}</li>
                  ))}
                </ul>
              )}
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
