"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { atom, useAtom } from "jotai";

const openAtom = atom(false);

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

export default function GetTask({ task }) {
  const [open, setOpen] = useAtom(openAtom);

  return (
    <div>
      <Button className="cursor-pointer" variant="secondary" size="sm" onClick={() => setOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clipRule="evenodd" />
        </svg>
      </Button>

      <CustomDialog open={open} onOpenChange={setOpen}>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Task Details</h2>
          <div>
            <p className="text-sm text-muted-foreground">Name:</p>
            <p className="text-base">{task.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Description:</p>
            <p className="text-base">{task.description}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Completed:</p>
            <p className="text-base">{task.isCompleted ? "Yes" : "No"}</p>
          </div>
          <div className="flex gap-2">
            {task.images.map((img) => (
              <div key={img.id} className="text-center">
                <Image src={img.imageName} alt={img.imageName} width={96} height={96} className="object-cover rounded-md border" />
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </CustomDialog>
    </div>
  );
}
