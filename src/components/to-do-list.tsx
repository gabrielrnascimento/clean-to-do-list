import { useState } from "react";
import { ToDoItem } from "./to-do-item";

export const ToDoList = (): JSX.Element => {
    const [toDos, setToDos] = useState<string[]>([]);

    const handleAddToDo = (): void => {
        setToDos([...toDos, ""]);
    };

    const handleToDoDescriptionChange = (
        index: number,
        description: string
    ): void => {
        const newToDos = [...toDos];
        newToDos[index] = description;
        setToDos(newToDos);
    };

    return (
        <>
            <h1>things to do</h1>
            <ul>
                {toDos.map((description, key) => (
                    <ToDoItem
                        key={key}
                        description={description}
                        onDescriptionChange={(newDescription: string) => {
                            handleToDoDescriptionChange(key, newDescription);
                        }}
                    />
                ))}
            </ul>
            <button onClick={handleAddToDo}>add to-do</button>
        </>
    );
};
