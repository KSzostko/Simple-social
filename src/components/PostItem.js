import React from 'react';

function PostItem({ data }) {
    return (
        <li>
            {data.title}
        </li>
    );
}

export default PostItem;