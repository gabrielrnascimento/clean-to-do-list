import { ToDoItem } from "./to-do-item";
import { useToDoContext } from "../contexts/to-do";

export const ToDoList = (): JSX.Element => {
    const {
        toDos,
        handleAddToDo,
        handleDeleteToDo,
        handleToDoDescriptionChange,
        handleToDoStatusChange,
    } = useToDoContext();

    return (
        <>
            <h1>things to do</h1>
            <ul>
                {toDos.map((toDo) => (
                    <ToDoItem
                        key={toDo.id}
                        description={toDo.description}
                        isDone={toDo.isDone}
                        onDescriptionChange={(newDescription: string) => {
                            void handleToDoDescriptionChange(
                                toDo.id,
                                newDescription
                            );
                        }}
                        onDelete={() => {
                            void handleDeleteToDo(toDo.id);
                        }}
                        onStatusChange={() => {
                            void handleToDoStatusChange(toDo.id, !toDo.isDone);
                        }}
                    />
                ))}
            </ul>
            <button
                onClick={() => {
                    void handleAddToDo();
                }}
            >
                add to-do
            </button>
        </>
    );
};
