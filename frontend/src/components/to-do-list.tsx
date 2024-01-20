"use client";

import { useState, type MouseEventHandler, useEffect } from "react";

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

    return (
        <>
            <h1 data-testid="title">things to do</h1>
            {todos.map((todo, key) => (
                <Todo
                    key={key}
                    content={todo}
                    onChange={(content) => {
                        onTodoChange(key, content);
                    }}
                />
            ))}
            <button data-testid="add-button" onClick={onAddTodo}>
                add to do
            </button>
        </>
    );
};

interface TodoProps {
    content: string;
    done?: boolean;
    onChange: (content: string) => void;
}

const Todo = ({ content, onChange }: TodoProps): JSX.Element => {
    const [todoContent, setTodoContent] = useState<string>(content);
    const [done, setDone] = useState<boolean>(false);

    useEffect(() => {
        setTodoContent(content);
    }, [content]);

    const handleBlur = (): void => {
        onChange(todoContent);
    };

    const handleCheckboxChange = (): void => {
        setDone(!done);
    };

    return (
        <div data-testid="todo">
            <input
                data-testid="status"
                type="checkbox"
                checked={done}
                onChange={() => {
                    handleCheckboxChange();
                }}
            />
            <input
                data-testid="content"
                type="text"
                value={todoContent}
                onBlur={handleBlur}
                onChange={(event) => {
                    setTodoContent(event.target.value);
                }}
            />
        </div>
    );
};
