import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../redux/user/userActions';
import UserItem from './UserItem';

function UsersContainer({ userData, fetchUsersFn }) {
    const { loading, users, error } = userData;

    useEffect(() => {
        fetchUsersFn();
    }, [fetchUsersFn]);
    
    return (
        <div>
            {loading ? (
                'Loading...'
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <UserItem
                            key={user.id}
                            data={user}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        userData: state,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsersFn: () => dispatch(fetchUsers()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
