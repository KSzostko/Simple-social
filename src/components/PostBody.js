import React from 'react';

const PostBody = ({ title, body }) => (
    <article>
        <h1>{title}</h1>
        <p>{body}</p>
    </article>
);

export default PostBody;