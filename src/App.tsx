import { container } from "./@core/infra/dependendy-injection/awilix";
import "./App.css";
import { ToDoList } from "./components/to-do-list";

function App(): JSX.Element {
    return (
        <ToDoList
            listToDosUseCase={container.resolve("remoteListToDosUseCase")}
        />
    );
}

export default App;
