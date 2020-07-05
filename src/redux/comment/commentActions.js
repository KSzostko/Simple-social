import axios from 'axios';
import {
    FETCH_COMMENTS_REQUEST,
    FETCH_COMMENTS_SUCCES,
    FETCH_COMMENTS_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
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

const addCommentRequest = () => ({
    type: ADD_COMMENT_REQUEST,
});

const addCommentSuccess = comment => ({
    type: ADD_COMMENT_SUCCESS,
    payload: comment,
});

const addCommentFailure = error => ({
    type: ADD_COMMENT_FAILURE,
    payload: error,
});

export const addComment = comment => {
    return (dispatch) => {
        const { name, email, body, postId } = comment;

        dispatch(addCommentRequest());
        axios.post('https://jsonplaceholder.typicode.com/comments', {
            name,
            email,
            body,
            postId: parseInt(postId),
        }, {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            }
        })
            .then(resp => {
                const data = resp.data;
                dispatch(addCommentSuccess(data));
            })
            .catch(err => {
                const message = err.message;
                dispatch(addCommentFailure(message));
            });
    }
}