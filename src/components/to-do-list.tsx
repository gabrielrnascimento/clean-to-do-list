import { ToDoItem } from "./to-do-item";
import { useToDoContext } from "../contexts/to-do";
import styled from "styled-components";

const Title = styled.h1`
    font-size: 4rem;
    text-align: center;
    color: #fff;
`;

const AddButton = styled.button`
    background-image: url("../../public/plus-regular.svg");
    background-size: cover;
    scale: 1;
    height: 2rem;
    width: 2rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
    align-self: center;
`;

const ToDoListContainer = styled.div`
    font-size: 2rem;
    display: flex;
    flex-direction: column;
`;

export const ToDoList = (): JSX.Element => {
    const { toDos, addToDo } = useToDoContext();

    return (
        <ToDoListContainer>
            <Title>things to do</Title>
            {toDos.map((toDo) => (
                <ToDoItem
                    key={toDo.id}
                    id={toDo.id}
                    description={toDo.description}
                    isDone={toDo.isDone}
                />
            ))}
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
