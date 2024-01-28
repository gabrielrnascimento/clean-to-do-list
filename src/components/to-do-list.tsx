import { useState } from "react";
import { ToDoItem } from "./to-do-item";

export const ToDoList = (): JSX.Element => {
    const [toDos, setToDos] = useState<string[]>([]);

    const handleAddToDo = (): void => {
        setToDos([...toDos, "new to-do"]);
    };

    return (
        <>
            <h1>things to do</h1>
            <ul>
                {toDos.map((key) => (
                    <ToDoItem key={key} />
                ))}
            </ul>
            <button onClick={handleAddToDo}>add to-do</button>
        </>
    );
};
