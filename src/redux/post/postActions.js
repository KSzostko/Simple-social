import axios from 'axios';
import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
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

export const fetchPosts = (id) => {
    return (dispatch) => {
        dispatch(fetchPostsRequest());
        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
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

const addPostRequest = () => ({
    type: ADD_POST_REQUEST,
});

const addPostSuccess = post => ({
    type: ADD_POST_SUCCESS,
    payload: post,
});

const addPostFailure = error => ({
    type: ADD_POST_FAILURE,
    payload: error,
});

export const addPost = post => {
    return (dispatch) => {
        const { title, body, userId } = post;
    
        dispatch(addPostRequest());
        axios.post('https://jsonplaceholder.typicode.com/posts', {
            title,
            body,
            userId: parseInt(userId),
        }, {
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
            .then(resp => {
                const data = resp.data;
                dispatch(addPostSuccess(data));
            })
            .catch(err => {
                const message = err.message;
                dispatch(addPostFailure(message));
            });
    }
};