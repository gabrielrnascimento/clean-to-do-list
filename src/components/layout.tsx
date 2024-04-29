// istanbul ignore file
import styled from "styled-components";

type LayoutProps = {
    children: React.ReactNode;
};

const LayoutContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
`;

const EmptyColumn = styled.div``;

export const Layout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <LayoutContainer>
            <EmptyColumn />
            {children}
            <EmptyColumn />
        </LayoutContainer>
    );
};
