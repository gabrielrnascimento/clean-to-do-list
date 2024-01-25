import React, { useState } from "react";
import { ResizableInput } from "./resizable-input";

interface TodoProps {
    content: string;
    done?: boolean;
    onChange: (content: string) => void;
    onDelete: () => void;
}

export const ToDoItem = ({ onChange, onDelete }: TodoProps): JSX.Element => {
    const [done, setDone] = useState<boolean>(false);

    const handleCheckboxChange = (): void => {
        setDone(!done);
    };

    return (
        <div data-testid="to-do-item" className="flex items-center group">
            <input
                data-testid="to-do-status"
                type="checkbox"
                checked={done}
                onChange={() => {
                    handleCheckboxChange();
                }}
                className="invisible group-hover:visible"
            />

            <ResizableInput placeholder={"new to do"} handleChange={onChange} />

            <button
                data-testid="to-do-delete-button"
                onClick={onDelete}
                className="invisible group-hover:visible"
            >
                delete to do
            </button>
        </div>
    );
};
