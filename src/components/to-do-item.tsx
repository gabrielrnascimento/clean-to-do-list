import { useEffect, useState } from "react";
import { ResizableInputText } from "./resizable-input-text";
import { useToDoContext } from "../contexts/to-do";

export type ToDoItemProps = {
    id: string;
    description: string;
    isDone: boolean;
};

export const ToDoItem = ({
    id,
    description,
    isDone,
}: ToDoItemProps): JSX.Element => {
    const [isToDoDone, setIsToDoDone] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const { updateToDoDescription, updateToDoStatus, deleteToDo } =
        useToDoContext();

    useEffect(() => {
        setIsToDoDone(isDone);
    }, [isDone]);

    const handleStatusChange = async (): Promise<void> => {
        setIsToDoDone(!isToDoDone);
        await updateToDoStatus(id, !isToDoDone);
    };

    const doneStyle = {
        textDecoration: "line-through",
        opacity: 0.5,
    };

    const handleDescriptionChange = async (
        newDescription: string
    ): Promise<void> => {
        if (description === newDescription || newDescription === "") return;
        await updateToDoDescription(id, newDescription);
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
                    onChange={() => {
                        void handleStatusChange();
                    }}
                    type="checkbox"
                    checked={isToDoDone}
                />
            )}
            <ResizableInputText
                placeholder="new to-do"
                value={description}
                onBlur={(newDescription) => {
                    void handleDescriptionChange(newDescription);
                }}
                style={isToDoDone ? doneStyle : undefined}
            />
            {isHovered && (
                <button
                    data-testid="delete-button"
                    onClick={() => {
                        void deleteToDo(id);
                    }}
                >
                    delete to-do
                </button>
            )}
        </div>
    );
};
