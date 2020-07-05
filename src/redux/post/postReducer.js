import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
} from './postTypes';

const initialState = {
    loading: false,
    posts: [],
    error: '',
};

const postReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_POSTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_POSTS_SUCCESS:
            return {
                loading: false,
                posts: action.payload,
                error: '',
            };
        case FETCH_POSTS_FAILURE:
            return {
                loading: false,
                posts: [],
                error: action.payload,
            };
        case ADD_POST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_POST_SUCCESS:
            return {
                loading: false,
                posts: [
                    ...state.posts,
                    action.payload,
                ],
                error: '',
            };
        case ADD_POST_FAILURE:
            return {
                loading: false,
                posts: [],
                error: action.payload,
            };
        default:
            return state;
    }
}

export default postReducer;