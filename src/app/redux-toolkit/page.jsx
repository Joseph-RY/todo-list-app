"use client";

import React from "react";
import AsyncTodo from "./async-todo/async-todo";
import { Provider } from "react-redux";
import { store } from "./store";

const Redux = () => {
  return (
    <Provider store={store}>
      <div>
        <AsyncTodo />
      </div>
    </Provider>
  );
};

export default Redux;
