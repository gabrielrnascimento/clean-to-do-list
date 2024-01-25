"use client";

import React, { useState, type MouseEventHandler } from "react";
import { ToDoItem } from "../to-do-item/to-do-item";

export const ToDoList = (): JSX.Element => {
    const [todos, setTodos] = useState<string[]>([]);

    const onAddTodo: MouseEventHandler<HTMLButtonElement> = () => {
        setTodos([...todos, "new todo"]);
    };

    const onTodoChange = (index: number, content: string): void => {
        setTodos((prevTodos) => {
            const newTodos = [...prevTodos];
            newTodos[index] = content;
            return newTodos;
        });
    };

    const onDeleteTodo = (index: number): void => {
        setTodos((prevTodos) => {
            const newTodos = [...prevTodos];
            newTodos.splice(index, 1);
            return newTodos;
        });
    };

    return (
        <>
            <h1 data-testid="title">things to do</h1>
            {todos.map((todo, key) => (
                <ToDoItem
                    key={key}
                    content={todo}
                    onChange={(content) => {
                        onTodoChange(key, content);
                    }}
                    onDelete={() => {
                        onDeleteTodo(key);
                    }}
                />
            ))}
            <button data-testid="add-button" onClick={onAddTodo}>
                add to do
            </button>
        </>
    );
};
