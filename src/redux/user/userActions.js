import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
} from './userTypes';

const fetchUsersRequest = () => ({
    type: FETCH_USERS_REQUEST,
});

const fetchUsersSuccess = users => ({
    type: FETCH_USERS_SUCCESS,
    payload: users,
});

const fetchUsersFailure = error => ({
    type: FETCH_USERS_FAILURE,
    payload: error,
});