"use client";

import React, { useState, type MouseEventHandler, useEffect } from "react";

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
                <Todo
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

interface TodoProps {
    content: string;
    done?: boolean;
    onChange: (content: string) => void;
    onDelete: () => void;
}

const Todo = ({ onChange, onDelete }: TodoProps): JSX.Element => {
    const [done, setDone] = useState<boolean>(false);

    const handleCheckboxChange = (): void => {
        setDone(!done);
    };

    return (
        <div data-testid="todo" className="flex items-center">
            <input
                data-testid="status"
                type="checkbox"
                checked={done}
                onChange={() => {
                    handleCheckboxChange();
                }}
            />

            <ResizableInput placeholder={"new to do"} handleChange={onChange} />

            <button data-testid="delete-button" onClick={onDelete}>
                delete to do
            </button>
        </div>
    );
};

interface ResizableInputProps {
    placeholder: string;
    handleChange: (content: string) => void;
}

const ResizableInput = ({
    placeholder,
    handleChange,
}: ResizableInputProps): JSX.Element => {
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        setInputValue(inputValue);
    }, [inputValue]);

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(event.target.value);
    };

    const handleBlur = (): void => {
        handleChange(inputValue);
    };

    return (
        <div className="relative inline-block">
            <span className="px-1 text-base inline-block invisible whitespace-pre">
                {inputValue !== "" ? inputValue : placeholder}
            </span>
            <input
                data-testid="content"
                className="px-1 text-base absolute top-0 left-0 right-0 bottom-0 border-none bg-transparent focus:outline-none"
                value={inputValue}
                onBlur={handleBlur}
                onChange={handleInput}
                autoFocus
                placeholder={placeholder}
            />
        </div>
    );
};
