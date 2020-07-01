import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const StyledLink = styled(Link)`
    background-color: #e4bb7a;
    padding: 15px 40px;
    font-size: 1.25rem;
    color: #fff;
    border-style: none;
    cursor: pointer;
    transition: 0.25s;
    text-decoration: none;
    text-align: center;

    &:hover {
        background-color: rgba(187, 144, 75, 0.9);
    }
`;

const UserItem = ({ data }) => {
    const { id, name, email, phone, website, company } = data;
    
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
            <StyledLink
                to={{
                    pathname: `/user/${id}`,
                    state: {
                        name: name,
                    }
                }}
            >
                Details
            </StyledLink>
        </StyledListItem>
    );
};

export default UserItem;