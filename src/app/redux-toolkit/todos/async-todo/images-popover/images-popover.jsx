"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import AddImage from "../add-image/add-image";
import DeleteImage from "../delete-image/delete-image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const ImagesPopover = ({ id }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="cursor-pointer h-9" size="sm" variant="secondary">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-4 p-4 w-72">
        <div>
          <h3 className="text-sm font-medium mb-2 text-muted-foreground">Add Images</h3>
          <AddImage id={id} />
        </div>
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium mb-2 text-muted-foreground">Delete Image</h3>
          <DeleteImage />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ImagesPopover;
