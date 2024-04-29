import { useEffect, useState } from "react";
import { useToDoContext } from "../contexts/to-do";
import styled from "styled-components";
import { ResizableTextArea } from "./resizable-text-area.tsx";

const ToDoItemContainer = styled.div`
    position: relative;
    display: flex;
    text-align: center;
    align-items: start;
`;

const OptionsContainer = styled.div`
    display: flex;
    justify-items: center;
    align-items: center;
    gap: 1rem;

    visibility: hidden;

    ${ToDoItemContainer}:hover & {
        visibility: visible;
    }

    padding: 0.3rem 1rem 0 0;
`;

const Checkbox = styled.input`
    scale: 2;
`;

const DeleteButton = styled.button`
    background-image: url("../../public/trash-can-regular.svg");
    background-color: transparent;
    scale: 0.6;
    width: 1.8rem;
    height: 2rem;
    background-size: cover;
    border: none;
    cursor: pointer;
`;

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
        <ToDoItemContainer data-testid="to-do-item-container">
            <OptionsContainer>
                <DeleteButton
                    data-testid="delete-button"
                    onClick={() => {
                        void deleteToDo(id);
                    }}
                ></DeleteButton>
                <Checkbox
                    data-testid="status-checkbox"
                    onChange={() => {
                        void handleStatusChange();
                    }}
                    type="checkbox"
                    checked={isToDoDone}
                />
            </OptionsContainer>
            <ResizableTextArea
                placeholder="new to-do"
                value={description}
                onBlur={(newDescription) => {
                    void handleDescriptionChange(newDescription);
                }}
                style={isToDoDone ? doneStyle : undefined}
            />
        </ToDoItemContainer>
    );
};
