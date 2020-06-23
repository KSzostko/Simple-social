import React from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
    background-color: #e4bb7a;
    padding: ${props => props.round ? '0' : '7px 20px'};
    font-size: ${props => props.round ? '3rem' : '1rem'};
    font-weight: ${props => props.round ? 700 : 400};
    color: #fff;
    border: none;
    cursor: pointer;
    transition: 0.25s;
    border-radius: ${props => props.round ? '50%' : 0};
    ${props => props.round && css`
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    `}

    &:hover {
        background-color: rgba(187, 144, 75, 0.9);
    }
`;

export default StyledButton;