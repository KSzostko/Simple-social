import axios from 'axios';
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

export const fetchUsers = () => {
    return (dispatch) => {
        console.log('hello');
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(resp => {
                const data = resp.data;
                dispatch(fetchUsersSuccess(data));
            })
            .catch(err => {
                const message = err.message;
                dispatch(fetchUsersFailure(message));
            });
    }
}