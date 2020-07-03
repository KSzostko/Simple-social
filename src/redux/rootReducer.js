import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './user/userReducer';
import postReducer from './post/postReducer';
import commentReducer from './comment/commentReducer';

const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer,
    comment: commentReducer,
    form: formReducer,
});

export default rootReducer;