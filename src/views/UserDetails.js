import React from 'react';
import { useParams } from 'react-router-dom';
import PostsList from '../components/PostsList';


function UserDetails(props) {
    const { name } = props.location.state.user;
    let { id } = useParams();
    
    return (
        <div>
            hello {name}
            <PostsList userId={id} />
        </div>
    );
}

export default UserDetails;