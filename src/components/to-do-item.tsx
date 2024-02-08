import { useEffect, useState } from "react";
import { ResizableInputText } from "./resizable-input-text";

export type ToDoItemProps = {
    description: string;
    isDone: boolean;
    onDescriptionChange: (description: string) => void;
    onDelete: () => void;
    onStatusChange: () => void;
};

export const ToDoItem = ({
    description,
    isDone,
    onDescriptionChange,
    onDelete,
    onStatusChange,
}: ToDoItemProps): JSX.Element => {
    const [isToDoDone, setIsToDoDone] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    useEffect(() => {
        setIsToDoDone(isDone);
    }, [isDone]);

    const handleStatusChange = (): void => {
        setIsToDoDone(!isToDoDone);
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
                    checked={isToDoDone}
                />
            )}
            <ResizableInputText
                placeholder="new to-do"
                value={description}
                onBlur={onDescriptionChange}
                style={isToDoDone ? doneStyle : undefined}
            />
            {isHovered && (
                <button data-testid="delete-button" onClick={onDelete}>
                    delete to-do
                </button>
            )}
        </div>
    );
};
