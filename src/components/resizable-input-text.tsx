import { useState } from "react";

type ResizableInputProps = {
    placeholder: string;
};

export const ResizableInputText = ({
    placeholder,
}: ResizableInputProps): JSX.Element => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setInputValue(event.target.value);
    };

    return (
        <>
            <span data-testid="resizable-text">
                {inputValue !== "" ? inputValue : placeholder}
            </span>
            <input
                data-testid="resizable-input"
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                autoFocus
            />
        </>
    );
};
