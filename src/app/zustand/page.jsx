"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import SyncTodo from "./todos/sync-todo/sync-todo";
import AsyncTodo from "./todos/async-todo/async-todo";

const Zustand = () => {
  const [todoMode, setTodoMode] = useState(false);

  return (
    <div className="p-4 space-y-4">
      <Button onClick={() => setTodoMode((prev) => !prev)}>Switch to {todoMode ? "Sync" : "Async"} Todo</Button>

      <div>{todoMode ? <AsyncTodo /> : <SyncTodo />}</div>
    </div>
  );
};

export default Zustand;
