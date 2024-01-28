import { ResizableInputText } from "./resizable-input-text";

export type ToDoItemProps = {
    description: string;
    onDescriptionChange: (description: string) => void;
};

export const ToDoItem = ({
    description,
    onDescriptionChange,
}: ToDoItemProps): JSX.Element => {
    return (
        <>
            <input type="checkbox" />
            <ResizableInputText
                placeholder="new to-do"
                value={description}
                onBlur={onDescriptionChange}
            />
            <button>delete to-do</button>
        </>
    );
};
