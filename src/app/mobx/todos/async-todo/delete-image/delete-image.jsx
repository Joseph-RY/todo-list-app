"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { observer } from "mobx-react-lite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import todoStore from "@/app/mobx/store";
import { API_URL } from "@/config/api";

function CustomDialog({ open, onOpenChange, children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!open || !mounted) return null;

  return createPortal(
    <div aria-modal="true" role="dialog" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => onOpenChange(false)}>
      <div className="bg-background rounded-lg p-6 max-w-lg w-full relative" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}

const DeleteImage = observer(({task}) => {
  const [open, setOpen] = useState(false);
  const [imageId, setImageId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageId) return;
    await todoStore.deleteAsyncImage(imageId);
    setImageId("");
    setOpen(false);
  };

  return (
    <div>
      <div className="flex gap-3 items-center cursor-pointer" onClick={() => setOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clipRule="evenodd" />
        </svg>
        <p>Delete Image</p>
      </div>

      <CustomDialog open={open} onOpenChange={setOpen}>
        <div className="flex flex-col gap-4">
          <header>
            <h2 className="text-lg font-semibold">Delete Image</h2>
            <p className="text-sm text-muted-foreground">Enter the image ID to delete it.</p>
            {task.images?.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground">Images:</p>
                <div className="flex gap-2 flex-wrap mt-2">
                  {task.images.map((img) => (
                    <div key={img.id} className="text-center">
                      <img src={`${API_URL}/images/${img.imageName}`} alt={img.imageName} className="w-24 h-24 object-cover rounded-md border" />
                      <p className="text-xs text-muted-foreground mt-1">ID: {img.id}</p>
                    </div>
                  ))}
                </div>
              </div>
            )} 
          </header>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="imageId">Image ID</Label>
              <Input id="imageId" type="text" value={imageId} onChange={(e) => setImageId(e.target.value)} required autoFocus />
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="destructive">
                Delete
              </Button>
            </div>
          </form>
        </div>
      </CustomDialog>
    </div>
  );
});

export default DeleteImage;
