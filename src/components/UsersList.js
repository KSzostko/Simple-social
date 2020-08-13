import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { fetchUsers } from '../redux/user/userActions';
import UserItem from './UserItem';
import Loader from './Loader';

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
                <Loader />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <StyledList data-testid="users-list">
                    {users.map((user) => (
                        <UserItem key={user.id} data={user} />
                    ))}
                </StyledList>
            )}
        </StyledWrapper>
    );
}

const mapStateToProps = state => {
    return {
        userData: state.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUsersFn: () => dispatch(fetchUsers()),
    };
}

UsersList.propTypes = {
    fetchUsersFn: PropTypes.func,
    userData: PropTypes.shape({
        loading: PropTypes.bool,
        error: PropTypes.string,
        users: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            username: PropTypes.string,
            email: PropTypes.string,
            adress: PropTypes.object,
            phone: PropTypes.string,
            website: PropTypes.string,
            company: PropTypes.objectOf(PropTypes.string),
        }))
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
