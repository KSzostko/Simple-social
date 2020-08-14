import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPosts } from '../redux/post/postActions';
import PostItem from './PostItem';
import Loader from './Loader';

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
                <Loader />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <StyledList data-testid="posts-list">
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

PostsList.propTypes = {
    userId: PropTypes.string,
    fetchPostsFn: PropTypes.func,
    postsData: PropTypes.shape({
        loading: PropTypes.bool,
        error: PropTypes.string,
        posts: PropTypes.arrayOf(
            PropTypes.shape({
                userId: PropTypes.number,
                id: PropTypes.number,
                title: PropTypes.string,
                body: PropTypes.string,
            })
        ),
    }),
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);