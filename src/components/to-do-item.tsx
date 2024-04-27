import { useEffect, useState } from "react";
import { ResizableInputText } from "./resizable-input-text";
import { useToDoContext } from "../contexts/to-do";
import styled from "styled-components";

const ToDoItemContainer = styled.div`
    position: relative;
    display: flex;
    text-align: center;
`;

const Checkbox = styled.input`
    position: absolute;
    scale: 2;
    top: 0.55rem;
    left: 0;
`;

const DeleteButtonContainer = styled.div`
    position: relative;
`;

const DeleteButton = styled.button`
    position: absolute;
    top: 0.3rem;
    left: 0.5rem;

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
        <ToDoItemContainer
            data-testid="to-do-item-container"
            onMouseEnter={() => {
                setIsHovered(true);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
            }}
        >
            {isHovered && (
                <Checkbox
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
            <DeleteButtonContainer>
                {isHovered && (
                    <DeleteButton
                        data-testid="delete-button"
                        onClick={() => {
                            void deleteToDo(id);
                        }}
                    ></DeleteButton>
                )}
            </DeleteButtonContainer>
        </ToDoItemContainer>
    );
};
