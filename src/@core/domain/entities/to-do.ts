type ToDoProps = {
    id: string;
    description: string;
    isDone: boolean;
};

export class ToDo {
    constructor(public props: ToDoProps) {}

    get id(): string {
        return this.props.id;
    }

    get description(): string {
        return this.props.description;
    }

    get isDone(): boolean {
        return this.props.isDone;
    }
}
