type ToDoProps = {
    id?: string;
    description: string;
    isDone: boolean;
};

export class ToDo {
    constructor(private readonly props: ToDoProps) {}

    get id(): string {
        return this.props.id ?? "";
    }

    set id(id: string) {
        this.props.id = id;
    }

    get description(): string {
        return this.props.description;
    }

    set description(description: string) {
        this.props.description = description;
    }

    get isDone(): boolean {
        return this.props.isDone;
    }

    set isDone(isDone: boolean) {
        this.props.isDone = isDone;
    }
}
