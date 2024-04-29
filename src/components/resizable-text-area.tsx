import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ResizableInput = styled.textarea`
    font-size: inherit;
    font-family: sans-serif;

    background-color: transparent;
    outline: none;
    color: #fff;
    border: none;
    resize: none;

    display: flex;
    flex: 1;
`;

export type ResizableTextAreaProps = {
    placeholder: string;
    value: string;
    onBlur: (value: string) => void;
    style?: React.CSSProperties;
};

export const ResizableTextArea = ({
    placeholder,
    value,
    onBlur,
    style,
}: ResizableTextAreaProps): JSX.Element => {
    const [inputValue, setInputValue] = useState<string>(value);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleTextAreaHeight = (): void => {
        // https://medium.com/@oherterich/creating-a-textarea-with-dynamic-height-using-react-and-typescript-5ed2d78d9848
        if (textAreaRef.current !== null) {
            textAreaRef.current.style.height = "0px";
            const scrollHeight = textAreaRef.current.scrollHeight;
            textAreaRef.current.style.height = scrollHeight + "px";
        }
    };

    useEffect(() => {
        handleTextAreaHeight();
    }, []);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ): void => {
        setInputValue(event.target.value);
        handleTextAreaHeight();
    };

    const handleInputBlur = (): void => {
        onBlur(inputValue);
    };

    return (
        <ResizableInput
            data-testid="resizable-input"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            ref={textAreaRef}
            autoFocus
            onBlur={handleInputBlur}
            style={style}
            rows={1}
        />
    );
};
