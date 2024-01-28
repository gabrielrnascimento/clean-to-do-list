import { useState } from "react";

export const ToDoList = (): JSX.Element => {
    const [toDos, setToDos] = useState<string[]>([]);

    const onClick = (): void => {
        setToDos([...toDos, "new to-do"]);
    };

    return (
        <>
            <h1>things to do</h1>
            <ul>
                {toDos.map((toDo, key) => (
                    <li key={key}>{toDo}</li>
                ))}
            </ul>
            <button onClick={onClick}>add to-do</button>
        </>
    );
};
