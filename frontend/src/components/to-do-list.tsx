"use client";

import { useState, type MouseEventHandler } from "react";

export const ToDoList = (): JSX.Element => {
    const [todos, setTodos] = useState<string[]>([]);

    const onClick: MouseEventHandler<HTMLButtonElement> = () => {
        setTodos([...todos, "new todo"]);
    };

    return (
        <>
            <h1 data-testid="title">things to do</h1>
            {todos.map((todo, key) => (
                <div data-testid="todo" key={key}>
                    {todo}
                </div>
            ))}
            <button data-testid="add-button" onClick={onClick}>
                add to do
            </button>
        </>
    );
};
