import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from './Button';

const DetailsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledIcon = styled.i`
    color: #e4bb7a;
    font-size: 3rem;
`;

const UserHeader = ({ name }) => (
    <DetailsHeader>
        <Link to="/">
            <StyledIcon
                className="fa fa-arrow-left"
                aria-hidden="true"
            ></StyledIcon>
        </Link>
        <h2>{name}</h2>
        <Button round>+</Button>
    </DetailsHeader>
);

export default UserHeader;