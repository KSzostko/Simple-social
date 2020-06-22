import axios from 'axios';
import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
} from './postTypes';

const fetchPostsRequest = () => ({
    type: FETCH_POSTS_REQUEST,
});

const fetchPostsSuccess = posts => ({
    type: FETCH_POSTS_SUCCESS,
    payload: posts,
});

const fetchPostsFailure = error => ({
    type: FETCH_POSTS_FAILURE,
    payload: error,
});

export const fetchPosts = () => {
    return (dispatch) => {
        dispatch(fetchPostsRequest());
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(resp => {
                const data = resp.data;
                dispatch(fetchPostsSuccess(data));
            })
            .catch(err => {
                const message = err.message;
                dispatch(fetchPostsFailure(message));
            });
    }
}