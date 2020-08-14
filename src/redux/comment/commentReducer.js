import {
    FETCH_COMMENTS_REQUEST,
    FETCH_COMMENTS_SUCCES,
    FETCH_COMMENTS_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
} from './commentTypes';

const initialState = {
    loading: false,
    comments: [],
    error: ''
};

const commentReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_COMMENTS_REQUEST:
        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_COMMENTS_SUCCES:
            return {
                loading: false,
                comments: action.payload,
                error: '',
            };
        case FETCH_COMMENTS_FAILURE:
        case ADD_COMMENT_FAILURE:
            return {
                loading: false,
                comments: [],
                error: action.payload,
            };
        case ADD_COMMENT_SUCCESS:
            return {
                loading: false,
                comments: [
                    ...state.comments,
                    action.payload,
                ],
                error: '',
            };
        default:
            return state;
    }
}

export default commentReducer;