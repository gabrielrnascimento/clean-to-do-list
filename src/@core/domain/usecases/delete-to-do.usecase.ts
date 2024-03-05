export interface DeleteToDoUseCase {
    delete: (id: string) => Promise<void>;
}
