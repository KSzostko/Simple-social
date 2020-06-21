import React from 'react';
import styled from 'styled-components';

// TODO: change styles
const StyledButton = styled.button`
    background-color: #e4bb7a;
    padding: 15px 40px;
    font-size: 1.25rem;
    color: #fff;
    border-style: none;
    cursor: pointer;
    transition: 0.25s;

    &:hover {
        background-color: rgba(187, 144, 75, 0.9);
    }
`;

const Button = ({ children }) => (
    <StyledButton>{children}</StyledButton>
);

export default Button;