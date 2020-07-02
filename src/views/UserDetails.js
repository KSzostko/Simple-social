import React from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../context';
import PostsList from '../components/PostsList';
import Button from '../components/Button';
import TestModal from '../components/TestModal';

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

const StyledIcon = styled.i`
    color: #e4bb7a;
    font-size: 3rem;
`;

function UserDetails(props) {
    const { name } = props.location.state;
    let { id } = useParams();
    
    return (
        <UserContext.Provider value={name}>
            <StyledWrapper>
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
                <PostsList userId={id} />
                <TestModal />
            </StyledWrapper>
        </UserContext.Provider>
    );
}

export default UserDetails;