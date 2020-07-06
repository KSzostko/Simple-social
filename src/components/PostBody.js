import React from 'react';
import PropTypes from 'prop-types';

const PostBody = ({ title, body }) => (
    <article>
        <h1>{title}</h1>
        <p>{body}</p>
    </article>
);

PostBody.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
};

export default PostBody;