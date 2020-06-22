import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../redux/post/postActions';

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
                <ul>
                    {posts.map((post) => (
                        <li key={post.id} data={post}>
                            {post.title}
                        </li>
                    ))}
                </ul>
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