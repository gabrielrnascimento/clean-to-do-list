import { ToDoItem } from "./to-do-item";
import { useToDoContext } from "../contexts/to-do";

export const ToDoList = (): JSX.Element => {
    const { toDos, addToDo } = useToDoContext();

    return (
        <>
            <h1>things to do</h1>
            <ul>
                {toDos.map((toDo) => (
                    <ToDoItem
                        key={toDo.id}
                        id={toDo.id}
                        description={toDo.description}
                        isDone={toDo.isDone}
                    />
                ))}
            </ul>
            <button
                onClick={() => {
                    void addToDo();
                }}
            >
                add to-do
            </button>
        </>
    );
};
