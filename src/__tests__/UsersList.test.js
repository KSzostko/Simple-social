import React from 'react';
import { Provider } from 'react-redux';
// import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import store from '../redux/store';
import UsersList from '../components/UsersList';

describe('<UsersList />', () => {
    it('renders loader while fetching data', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <UsersList />
            </Provider>
        );

        getByTestId('loader');
    });
});