import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from '../redux/store';
import UsersPage from './UsersPage';
import UserDetails from './UserDetails';

function Root() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Route exact path="/" component={UsersPage} />
                <Route path="/user/:id" component={UserDetails} />
            </BrowserRouter>
        </Provider>
    );
}

export default Root;
