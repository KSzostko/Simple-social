import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { fetchComments } from '../redux/comment/commentActions';
import CommentItem from './CommentItem';
import Loader from './Loader';

const StyledList = styled.ul`
    list-style: none;
    padding-left: 0;
`;

function CommentsList({ postId, commentsData, fetchCommentsFn }) {
    const { loading, comments, error } = commentsData;

    useEffect(() => {
        fetchCommentsFn(postId);
    }, [fetchCommentsFn, postId]);
    
    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <StyledList data-testid="comments-list">
                    {comments.map((comment) => (
                        <CommentItem key={comment.id} data={comment} />
                    ))}
                </StyledList>
            )}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        commentsData: state.comment,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCommentsFn: id => dispatch(fetchComments(id)),
    };
}

CommentsList.propTypes = {
    postId: PropTypes.string,
    fetchCommentsFn: PropTypes.func,
    commentsData: PropTypes.shape({
        loading: PropTypes.bool,
        error: PropTypes.string,
        comments: PropTypes.arrayOf(
            PropTypes.shape({
                postId: PropTypes.number,
                id: PropTypes.number,
                name: PropTypes.string,
                email: PropTypes.string,
                body: PropTypes.string,
            })
        ),
    }),
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);