import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from '../redux/store';
import UsersPage from './UsersPage';
import UserDetails from './UserDetails';
import PostDetails from './PostDetails';

function Root() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Route exact path="/" component={UsersPage} />
                <Route exact path="/user/:id" component={UserDetails} />
                <Route path="/user/:id/:post" component={PostDetails} />
            </BrowserRouter>
        </Provider>
    );
}

export default Root;
