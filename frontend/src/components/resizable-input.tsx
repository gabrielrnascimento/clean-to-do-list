import React, { useEffect, useState } from "react";

interface ResizableInputProps {
    placeholder: string;
    handleChange: (content: string) => void;
}

export const ResizableInput = ({
    placeholder,
    handleChange,
}: ResizableInputProps): JSX.Element => {
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        setInputValue(inputValue);
    }, [inputValue]);

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(event.target.value);
    };

    const handleBlur = (): void => {
        handleChange(inputValue);
    };

    return (
        <div className="relative inline-block">
            <span className="px-1 text-base inline-block invisible whitespace-pre">
                {inputValue !== "" ? inputValue : placeholder}
            </span>
            <input
                data-testid="resizable-input-content"
                className="px-1 text-base absolute top-0 left-0 right-0 bottom-0 border-none bg-transparent focus:outline-none"
                value={inputValue}
                onBlur={handleBlur}
                onChange={handleInput}
                autoFocus
                placeholder={placeholder}
            />
        </div>
    );
};
