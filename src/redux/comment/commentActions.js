import axios from 'axios';
import {
    FETCH_COMMENTS_REQUEST,
    FETCH_COMMENTS_SUCCES,
    FETCH_COMMENTS_FAILURE
} from './commentTypes';

const fetchCommentsRequest = () => ({
    type: FETCH_COMMENTS_REQUEST
});

const fetchCommentsSuccess = comments => ({
    type: FETCH_COMMENTS_SUCCES,
    payload: comments
});

const fetchCommentsFailure = error => ({
    type: FETCH_COMMENTS_FAILURE,
    payload: error
});

export const fetchComments = (id) => {
    return (dispatch) => {
        dispatch(fetchCommentsRequest());
        axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
            .then(resp => {
                const data = resp.data;
                dispatch(fetchCommentsSuccess(data));
            })
            .catch(err => {
                const message = err.message;
                dispatch(fetchCommentsFailure(message));
            });
    }
}