import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const StyledListItem = styled.li`
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    padding: 20px;
    border: 1px solid #000;
`;

const StyledInfoList = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin-bottom: 20px;
    font-size: ${props => props.contact ? '12px' : '16px'};
    font-weight: ${props => props.contact ? 300 : 400};
`;

const UserItem = ({ data }) => {
    const { name, email, phone, website, company } = data;
    
    return (
        <StyledListItem>
            <h2>{name}</h2>
            <StyledInfoList contact>
                <li>{email}</li>
                <li>{phone}</li>
                <li>{website}</li>
            </StyledInfoList>
            <StyledInfoList>
                <li>{company.name}</li>
                <li>{company.catchPhrase}</li>
                <li>{company.bs}</li>
            </StyledInfoList>
            <Button>Details</Button>
        </StyledListItem>
    );
};

export default UserItem;