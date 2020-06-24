import React from 'react';
import { useParams } from 'react-router-dom';

function PostDetails(props) {
    let { id, post } = useParams();
    
    return (
        <div>
            hello this is user {id} post {post}
        </div>
    );
}

export default PostDetails;