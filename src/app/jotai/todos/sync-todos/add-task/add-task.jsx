"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddTodo } from "@/app/jotai/stores/sync-store/sync-store";

export default function AddTask() {
  const addTodo = useAddTodo();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageLinks, setImageLinks] = useState([]);
  const [newImageLink, setNewImageLink] = useState("");

  const handleAddImageLink = () => {
    if (newImageLink.trim()) {
      setImageLinks((prev) => [...prev, { id: Date.now(), imageName: newImageLink.trim() }]);
      setNewImageLink("");
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!name.trim() || !description.trim()) return;

    addTodo({
      id: Date.now() % 10000,
      name,
      description,
      images: imageLinks,
      isCompleted: false,
    });

    setName("");
    setDescription("");
    setImageLinks([]);
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>+ Add Task</Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setOpen(false)}>
          <div className="bg-background rounded-lg p-6 max-w-lg w-full relative" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-4">Add New Task</h2>

            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required autoFocus />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>

              <div>
                <Label htmlFor="images">Image Links</Label>
                <div className="flex gap-2">
                  <Input id="images" placeholder="/task.webp" value={newImageLink} onChange={(e) => setNewImageLink(e.target.value)} />
                  <Button type="button" onClick={handleAddImageLink}>
                    Add
                  </Button>
                </div>
                {imageLinks.length > 0 && (
                  <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
                    {imageLinks.map((img) => (
                      <li key={img.id}>{img.imageName}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Task</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
