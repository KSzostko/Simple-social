import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context';
import PostsList from '../components/PostsList';
import UserHeader from '../components/UserHeader';

const StyledWrapper = styled.div`
    max-width: 1200px;
    margin: 40px auto 0;
    display: flex;
    flex-direction: column;
`;

function UserDetails(props) {
    const { name } = props.location.state.user;
    let { id } = useParams();
    
    return (
        <UserContext.Provider value={name}>
            <StyledWrapper>
                <UserHeader name={name} />
                <PostsList userId={id} />
            </StyledWrapper>
        </UserContext.Provider>
    );
}

export default UserDetails;