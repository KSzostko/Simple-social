import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import PostsList from '../components/PostsList';
import Button from '../components/Button';

const StyledWrapper = styled.div`
    max-width: 1200px;
    margin: 40px auto 0;
    display: flex;
    flex-direction: column;
`;

const DetailsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

function UserDetails(props) {
    const { name } = props.location.state.user;
    let { id } = useParams();
    
    return (
        <StyledWrapper>
            <DetailsHeader>
                {/* TODO: change to arrow Link */}
                <Button>Back</Button>
                <h2>{name}</h2>
                <Button round>+</Button>
            </DetailsHeader>
            <PostsList userId={id} />
        </StyledWrapper>
    );
}

export default UserDetails;