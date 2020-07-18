import React from 'react';
import styled from 'styled-components';

const StyledError = styled.span`
    color: red;
    grid-column: 2 / -1;
    justify-content: center;
    margin-left: 5px;
    margin-top: 10px;
    font-size: 12px;
`;

function TextError(props) {
    return (
        <StyledError>{props.children}</StyledError>
    );
}

export default TextError;