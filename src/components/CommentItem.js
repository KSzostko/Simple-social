import React from 'react';
import styled from 'styled-components';

const StyledListItem = styled.li`
    border: 1px solid #000;
    padding:  20px 10px;
    margin-bottom: 20px;
`;

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
`;

const StyledTitle = styled.h3`
    font-size: 0.9rem;
    margin: 0;
`;

const StyledEmail = styled.span`
    font-size: 0.8rem;
    color: #0000ee;
    text-decoration: underline;
    cursor: pointer;
`;

const StyledParagraph = styled.p`
    font-size: 0.9rem;
    margin-bottom: 0;
`;

function CommentItem({ data }) {
    const { name, email, body } = data;
    
    return (
        <StyledListItem>
            <article>
                <StyledHeader>
                    <StyledTitle>{name}</StyledTitle>
                    <StyledEmail>{email}</StyledEmail>
                </StyledHeader>
                <StyledParagraph>{body}</StyledParagraph>
            </article>
        </StyledListItem>
    );
}

export default CommentItem;