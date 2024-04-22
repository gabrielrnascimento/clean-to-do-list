export interface DeleteToDoGateway {
    delete: (id: string) => Promise<void>;
}
