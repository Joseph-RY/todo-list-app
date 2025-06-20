"use client";

import React, { useState } from "react";
import { observer } from "mobx-react";
import { Button } from "@/components/ui/button";
import SyncTodo from "./todos/sync-todo/sync-todo";
import AsyncTodo from "./todos/async-todo/async-todo";
import todoStore from "./store";

const MobXTodos = observer(() => {
  const [todoMode, setTodoMode] = useState(false);

  const toggleMode = () => setTodoMode((prev) => !prev);

  return (
    <div className="p-4 space-y-4">
      <Button onClick={toggleMode}>Switch to {todoMode ? "Sync" : "Async"} Todo</Button>
      <div>{todoMode ? <AsyncTodo store={todoStore} /> : <SyncTodo store={todoStore} />}</div>
    </div>
  );
});

export default MobXTodos;
