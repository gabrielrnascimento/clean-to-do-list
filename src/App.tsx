import "./App.css";
import { container } from "./@core/infra/dependendy-injection/awilix";
import { ToDoList } from "./components/to-do-list";
import { ToDoProvider } from "./contexts/to-do";
import { Layout } from "./components/layout.tsx";

function App(): JSX.Element {
    return (
        <Layout>
            <ToDoProvider
                listToDosUseCase={container.resolve("remoteListToDosUseCase")}
                createToDoUseCase={container.resolve("remoteCreateToDoUseCase")}
                updateToDoUseCase={container.resolve("remoteUpdateToDoUseCase")}
                deleteToDoUseCase={container.resolve("remoteDeleteToDoUseCase")}
            >
                <ToDoList />
            </ToDoProvider>
        </Layout>
    );
}

export default App;
