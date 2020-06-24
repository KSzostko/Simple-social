import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from './Button';

const StyledListItem = styled.li`
    border: 1px solid #000;
    padding: 10px;
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 10px;
    align-items: center;
`;

const StyledHeader = styled.h3`
    font-weight: 400;
    font-size: 1rem;
`;

const StyledIcon = styled.i`
    color: #e4bb7a;
    font-size: 2rem;
`;

function PostItem({ data }) {
    const { userId, id, title } = data;
    
    return (
        <StyledListItem>
            <Button icon>
                <StyledIcon className="fa fa-trash-o" aria-hidden="true"></StyledIcon>
            </Button>
            <StyledHeader>{title}</StyledHeader>
            <Link to={`/user/${userId}/${id}`}>
                <StyledIcon
                    className="fa fa-chevron-right"
                    aria-hidden="true"></StyledIcon>
            </Link>
        </StyledListItem>
    );
}

export default PostItem;