import { ResizableInputText } from "./resizable-input-text";

export const ToDoItem = (): JSX.Element => {
    return (
        <>
            <input type="checkbox" />
            <ResizableInputText placeholder="new to-do" />
            <button>delete to-do</button>
        </>
    );
};
