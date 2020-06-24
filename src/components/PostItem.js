import React from 'react';
import styled from 'styled-components';
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

function PostItem({ data }) {
    return (
        <StyledListItem>
            {/* TODO: change buttons to links */}
            <Button>Remove</Button>
            <StyledHeader>{data.title}</StyledHeader>
            <Button>details</Button>
        </StyledListItem>
    );
}

export default PostItem;