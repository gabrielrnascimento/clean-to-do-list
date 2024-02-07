import { useState } from "react";
import { ResizableInputText } from "./resizable-input-text";
import styled from "styled-components";

const DeleteButton = styled.button`
    display: none;
`;

const StatusCheckbox = styled.input`
    display: none;
`;

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

    const handleStatusChange = (): void => {
        setIsDone(!isDone);
        onStatusChange();
    };

    const doneStyle = {
        textDecoration: "line-through",
        opacity: 0.5,
    };

    return (
        <>
            <StatusCheckbox
                data-testid="status-checkbox"
                onChange={handleStatusChange}
                type="checkbox"
            />
            <ResizableInputText
                placeholder="new to-do"
                value={description}
                onBlur={onDescriptionChange}
                style={isDone ? doneStyle : undefined}
            />
            <DeleteButton data-testid="delete-button" onClick={onDelete}>
                delete to-do
            </DeleteButton>
        </>
    );
};
