import { ResizableInputText } from "./resizable-input-text";

export type ToDoItemProps = {
    description: string;
    onDescriptionChange: (description: string) => void;
    onDelete: () => void;
};

export const ToDoItem = ({
    description,
    onDescriptionChange,
    onDelete,
}: ToDoItemProps): JSX.Element => {
    return (
        <>
            <input type="checkbox" />
            <ResizableInputText
                placeholder="new to-do"
                value={description}
                onBlur={onDescriptionChange}
            />
            <button onClick={onDelete}>delete to-do</button>
        </>
    );
};
