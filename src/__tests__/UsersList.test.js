import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, wait } from '@testing-library/react';
import mockAxios from 'axios';
import { fakeUser } from '../lib/testUtils';
import store from '../redux/store';
import UsersList from '../components/UsersList';

jest.mock('axios');
mockAxios.get.mockResolvedValue({
    data: [{ ...fakeUser() }]
});

describe('<UsersList />', () => {
    it('renders loader while fetching data', () => {
        render(
            <Provider store={store}>
                <UsersList />
            </Provider>, {
                wrapper: MemoryRouter
            }
        );

        screen.getByTestId('loader');
    });

    it('renders users list after receiving data', async () => {
        render(
            <Provider store={store}>
                <UsersList />
            </Provider>, {
                wrapper: MemoryRouter
            }
        );

        await wait(() => screen.getByTestId('users-list'));
        screen.debug();
    });
});