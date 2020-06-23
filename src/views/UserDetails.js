import React from 'react';
import { useParams } from 'react-router-dom';
import PostsList from '../components/PostsList';
import Button from '../components/Button';


function UserDetails(props) {
    const { name } = props.location.state.user;
    let { id } = useParams();
    
    return (
        <div>
            <div>
                <Button>Back</Button>
                <h2>{name}</h2>
                <Button round>+</Button>
            </div>
            <PostsList userId={id} />
        </div>
    );
}

export default UserDetails;