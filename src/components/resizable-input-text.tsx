import { useState } from "react";
import styled from "styled-components";

const ResizableContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const ResizableText = styled.span`
    margin: 0;
    padding: 0 0.4rem 0 0.2rem;
    font-size: inherit;
    font-family: sans-serif;

    display: inline-block;
    visibility: hidden;
    white-space: pre;
`;

const ResizableInput = styled.input`
    margin: 0;
    padding: 0 0.2rem;
    font-size: inherit;
    font-family: sans-serif;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: transparent;
    outline: none;
    color: #fff;
    border: none;
`;

export type ResizableInputProps = {
    placeholder: string;
    value: string;
    onBlur: (value: string) => void;
    style?: React.CSSProperties;
};

export const ResizableInputText = ({
    placeholder,
    value,
    onBlur,
    style,
}: ResizableInputProps): JSX.Element => {
    const [inputValue, setInputValue] = useState<string>(value);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setInputValue(event.target.value);
    };

    const handleInputBlur = (): void => {
        onBlur(inputValue);
    };

    return (
        <ResizableContainer data-testid="resizable-container">
            <ResizableText data-testid="resizable-text">
                {inputValue !== "" ? inputValue : placeholder}
            </ResizableText>
            <ResizableInput
                data-testid="resizable-input"
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                autoFocus
                onBlur={handleInputBlur}
                style={style}
            />
        </ResizableContainer>
    );
};
