import { RemoteListToDosUseCase } from "./@core/application/to-do";
import { env } from "./@core/infra/config";
import { ToDoHttpGateway } from "./@core/infra/gateways/to-do-http.gateway";
import { AxiosHttpClient } from "./@core/infra/http/axios-http-client";
import "./App.css";
import { ToDoList } from "./components/to-do-list";

const axiosHttpClient = new AxiosHttpClient();
const url = env.apiUrl;
const toDoHttpGateway = new ToDoHttpGateway(url, axiosHttpClient);
const remoteListToDosUseCase = new RemoteListToDosUseCase(toDoHttpGateway);

function App(): JSX.Element {
    return <ToDoList listToDosUseCase={remoteListToDosUseCase} />;
}

export default App;
