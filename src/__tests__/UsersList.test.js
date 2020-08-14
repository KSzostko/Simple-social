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

    it('renders users list and displays users data after successfull api call', async () => {
        const fakeUserData = fakeUser();
        
        render(
            <Provider store={store}>
                <UsersList />
            </Provider>, {
                wrapper: MemoryRouter
            }
        );

        await wait(() => screen.getByTestId('users-list'));
        await wait(() => screen.findByText(fakeUserData.name));
        await wait(() => screen.findByText(fakeUserData.email));
        await wait(() => screen.findByText(fakeUserData.phone));
    });

    it('displays an error after unsuccessfull data fetching', async () => {
        const errorMessage = 'API call was not successfull';
        
        mockAxios.get.mockRejectedValue({
            message: errorMessage
        });
        
        render(
            <Provider store={store}>
                <UsersList />
            </Provider>, {
                wrapper: MemoryRouter
            }
        );

        await wait(() => screen.getByText(errorMessage));
        await wait(() => expect(screen.queryByTestId('users-list')).not.toBeInTheDocument());
    });
});