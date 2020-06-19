import React from 'react';
import { connect } from 'react-redux';
import Button from './Button';

function UsersContainer({ userData }) {
    const { loading, users, error } = userData;
    
    return (
        <div>
            <Button>Details</Button>
            {loading ? (
                'Loading...'
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        userData: state,
    };
};

export default connect(mapStateToProps)(UsersContainer);
