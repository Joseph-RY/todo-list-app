"use client";

import React, { useState } from "react";
import { Provider } from "react-redux";
import { Button } from "@/components/ui/button";
import AsyncTodo from "./async-todo/async-todo";
import SyncTodo from "./sync-todo/sync-todo";
import { store } from "./store";

const Redux = () => {
  const [todoMode, setTodoMode] = useState(false);

  return (
    <Provider store={store}>
      <div className="p-4 space-y-4">
        <Button onClick={() => setTodoMode((prev) => !prev)}>Switch to {todoMode ? "Sync" : "Async"} Todo</Button>

        <div>{todoMode ? <AsyncTodo /> : <SyncTodo />}</div>
      </div>
    </Provider>
  );
};

export default Redux;
