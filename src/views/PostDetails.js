import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import CommentsList from '../components/CommentsList';
import PostBody from '../components/PostBody';
import FormModal from '../components/FormModal';
import Button from '../components/Button';

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

const ButtonsWrapper = styled.div`
    margin-top: 40px;
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
`;

const StyledButton = styled(Button)`
    border-radius: 5px;
`;

function PostDetails(props) {
    const { name, post: { title, body } } = props.location.state;
    let { id, post } = useParams();

    const [ commentsOpen, setCommentsOpen ] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleClick = () => {
        setCommentsOpen(prevCommentsOpen => !prevCommentsOpen);
    }
    
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
            <ButtonsWrapper>
                <StyledButton onClick={handleClick}>{commentsOpen ? 'Hide' : 'Show'} comments</StyledButton>
                {commentsOpen && <StyledButton onClick={openModal}>Add comment</StyledButton>}
            </ButtonsWrapper>
            {commentsOpen && <CommentsList postId={post} />}
            <FormModal
                type="comment" 
                modalOpen={modalOpen} 
                closeModal={closeModal} 
            />
        </StyledWrapper>
    );
}

export default PostDetails;