import React from 'react';
import { useParams } from 'react-router-dom';
import PostsList from '../components/PostsList';

function UserDetails() {
    let { id } = useParams();
    
    return (
        <PostsList userId={id} />
    );
}

export default UserDetails;