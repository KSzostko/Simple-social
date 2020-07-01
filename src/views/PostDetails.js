import React from 'react';
import { useParams } from 'react-router-dom';
import UserHeader from '../components/UserHeader';

function PostDetails(props) {
    const { name, post: { title } } = props.location.state;
    let { id, post } = useParams();
    
    return (
        <div>
            hello this is user {id} name is {name} and post {post} with title {title}
            <UserHeader name={name} />
        </div>
    );
}

export default PostDetails;