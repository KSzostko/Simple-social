import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
    background-color: ${props => props.icon ? '#fff': '#e4bb7a'};
    padding: ${props => props.round || props.icon ? '0' : '7px 20px'};
    font-size: ${props => props.round ? '2.5rem' : '1rem'};
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

    ${props => !props.icon && css`
        &:hover {
            background-color: rgba(187, 144, 75, 0.9);
        }
    `}

    &:disabled {
        background-color: rgba(228, 187, 122, 0.6);
        cursor: not-allowed;
    }
`;

StyledButton.propTypes = {
    icon: PropTypes.bool,
    round: PropTypes.bool,
};

export default StyledButton;