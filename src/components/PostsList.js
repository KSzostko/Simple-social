import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchPosts } from '../redux/post/postActions';
import PostItem from './PostItem';

const StyledList = styled.ul`
    list-style: none;
    padding-left: 0;
`;

function PostsList({ userId, postsData, fetchPostsFn }) {
    const { loading, posts, error } = postsData;
    
    useEffect(() => {
        fetchPostsFn(userId);
    }, [fetchPostsFn, userId]);

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
                    {posts.map((post) => (
                        <PostItem key={post.id} data={post} />
                    ))}
                </StyledList>
            )}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        postsData: state.post,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPostsFn: id => dispatch(fetchPosts(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);