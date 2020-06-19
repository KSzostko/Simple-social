import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchUsers } from '../redux/user/userActions';

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

const Button = ({ children, fetchUsersFn }) => (
    <StyledButton onClick={fetchUsersFn}>{children}</StyledButton>
);

const mapDispatchToProps = dispatch => {
    return {
        fetchUsersFn: dispatch(fetchUsers())
    }
}

export default connect(null, mapDispatchToProps)(Button);