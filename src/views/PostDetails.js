import React from 'react';
import { useParams } from 'react-router-dom';

function PostDetails(props) {
    const { name, post: { title } } = props.location.state;
    let { id, post } = useParams();
    
    return (
        <div>
            hello this is user {id} name is {name} and post {post} with title {title}
        </div>
    );
}

export default PostDetails;