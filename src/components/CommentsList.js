import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchComments } from '../redux/comment/commentActions';
import CommentItem from './CommentItem';

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
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <StyledList>
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

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);