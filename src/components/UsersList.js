import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchUsers } from '../redux/user/userActions';
import UserItem from './UserItem';

const StyledWrapper = styled.div`
    max-width: 1600px;
    margin: 40px auto 0;
`;

const StyledList = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-gap: 20px 40px;
`;

function UsersList({ userData, fetchUsersFn }) {
    const { loading, users, error } = userData;

    useEffect(() => {
        fetchUsersFn();
    }, [fetchUsersFn]);
    
    return (
        <StyledWrapper>
            {loading ? (
                'Loading...'
            ) : error ? (
                <p>{error}</p>
            ) : (
                <StyledList>
                    {users.map((user) => (
                        <UserItem
                            key={user.id}
                            data={user}
                        />
                    ))}
                </StyledList>
            )}
        </StyledWrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
