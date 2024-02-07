import { useState } from "react";
import { ResizableInputText } from "./resizable-input-text";

export type ToDoItemProps = {
    description: string;
    onDescriptionChange: (description: string) => void;
    onDelete: () => void;
    onStatusChange: () => void;
};

export const ToDoItem = ({
    description,
    onDescriptionChange,
    onDelete,
    onStatusChange,
}: ToDoItemProps): JSX.Element => {
    const [isDone, setIsDone] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleStatusChange = (): void => {
        setIsDone(!isDone);
        onStatusChange();
    };

    const doneStyle = {
        textDecoration: "line-through",
        opacity: 0.5,
    };

    return (
        <div
            data-testid="to-do-item-container"
            onMouseEnter={() => {
                setIsHovered(true);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
            }}
        >
            {isHovered && (
                <input
                    data-testid="status-checkbox"
                    onChange={handleStatusChange}
                    type="checkbox"
                    checked={isDone}
                />
            )}
            <ResizableInputText
                placeholder="new to-do"
                value={description}
                onBlur={onDescriptionChange}
                style={isDone ? doneStyle : undefined}
            />
            {isHovered && (
                <button data-testid="delete-button" onClick={onDelete}>
                    delete to-do
                </button>
            )}
        </div>
    );
};
