"use client";

import React, { Component } from "react";
import { observer } from "mobx-react";
import { Button } from "@/components/ui/button";
import SyncTodo from "./todos/sync-todo/sync-todo";
import AsyncTodo from "./todos/async-todo/async-todo";
import todoStore from "./store";

class MobXTodos extends Component {
  state = {
    todoMode: false,
  };

  toggleMode = () => {
    this.setState(({ todoMode }) => ({ todoMode: !todoMode }));
  };

  render() {
    const { todoMode } = this.state;
    return (
      <div className="p-4 space-y-4">
        <Button onClick={this.toggleMode}>Switch to {todoMode ? "Sync" : "Async"} Todo</Button>

        <div>{todoMode ? <AsyncTodo store={todoStore} /> : <SyncTodo store={todoStore} />}</div>
      </div>
    );
  }
}

export default observer(MobXTodos);
