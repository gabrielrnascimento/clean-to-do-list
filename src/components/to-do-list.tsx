import { ToDoItem } from "./to-do-item";
import { useToDoContext } from "../contexts/to-do";
import styled from "styled-components";

const AddButton = styled.button`
    background-image: url("../../public/plus-regular.svg");
    background-size: cover;
    scale: 1;
    height: 2rem;
    width: 2rem;
    background-color: transparent;
    border: none;

    cursor: pointer;
`;

const ToDoListContainer = styled.div`
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const UnorderedList = styled.ul`
    padding: 0;
`;

export const ToDoList = (): JSX.Element => {
    const { toDos, addToDo } = useToDoContext();

    return (
        <ToDoListContainer>
            <h1>things to do</h1>
            <UnorderedList>
                {toDos.map((toDo) => (
                    <ToDoItem
                        key={toDo.id}
                        id={toDo.id}
                        description={toDo.description}
                        isDone={toDo.isDone}
                    />
                ))}
            </UnorderedList>
            <AddButton
                title="create to do"
                data-testid="add-button"
                onClick={() => {
                    void addToDo();
                }}
            ></AddButton>
        </ToDoListContainer>
    );
};
