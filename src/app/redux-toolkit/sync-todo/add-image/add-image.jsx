"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { addImage } from "@/app/redux-toolkit/stores/syncTodoSlice";

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

export default function AddImage({ id }) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));
    dispatch(addImage({ id: id, images }));
    setImages([]);
    setOpen(false);
  };

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  return (
    <div>
      <div className="flex gap-3 items-center cursor-pointer" onClick={() => setOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
        </svg>
        <p>Add Image</p>
      </div>

      <CustomDialog open={open} onOpenChange={setOpen}>
        <div className="flex flex-col gap-4">
          <header>
            <h2 className="text-lg font-semibold">Add Images</h2>
            <p className="text-sm text-muted-foreground">Upload one or more images for this task.</p>
          </header>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="images">Images</Label>
              <Input id="images" type="file" multiple accept="image/*" onChange={handleFileChange} required />
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Upload</Button>
            </div>
          </form>
        </div>
      </CustomDialog>
    </div>
  );
}
