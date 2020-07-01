import React from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import PostBody from '../components/PostBody';

const StyledWrapper = styled.div`
    max-width: 1200px;
    margin: 40px auto 0;
`;

const DetailsHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
`;

const StyledIcon = styled.i`
    color: #e4bb7a;
    font-size: 3rem;
`;

function PostDetails(props) {
    const { name, post: { title, body } } = props.location.state;
    let { id, post } = useParams();
    
    return (
        <StyledWrapper>
            <DetailsHeader>
                <Link
                    to={{
                        pathname: `/user/${id}`,
                        state: {
                            name: name
                        }
                    }}
                >
                    <StyledIcon
                        className="fa fa-arrow-left"
                        aria-hidden="true"
                    ></StyledIcon>
                </Link>
                <h2>{name}</h2>
            </DetailsHeader>
            <PostBody title={title} body={body} />
        </StyledWrapper>
    );
}

export default PostDetails;