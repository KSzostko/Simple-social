import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, wait } from '@testing-library/react';
import mockAxios from 'axios';
import { fakePost } from '../lib/testUtils';
import store from '../redux/store';
import PostsList from '../components/PostsList';

jest.mock('axios');
mockAxios.get.mockResolvedValue({
    data: [{ ...fakePost() }]
});

describe('<PostsList />', () => {
    it('renders loader while fetching data', () => {
        render(
            <Provider store={store}>
                <PostsList />
            </Provider>, {
                wrapper: MemoryRouter
            }
        );

        screen.getByTestId('loader');
    });

    it('renders users list and displays users data after successfull api call', async () => {
        const fakePostData = fakePost();
        
        render(
            <Provider store={store}>
                <PostsList />
            </Provider>, {
                wrapper: MemoryRouter
            }
        );

        await wait(() => screen.getByTestId('posts-list'));
        await wait(() => screen.findByText(fakePostData.title));
    });

    it('displays an error after unsuccessfull data fetching', async () => {
        const errorMessage = 'API call was not successfull';
        
        mockAxios.get.mockRejectedValue({
            message: errorMessage
        });
        
        render(
            <Provider store={store}>
                <PostsList />
            </Provider>, {
                wrapper: MemoryRouter
            }
        );

        await wait(() => screen.getByText(errorMessage));
        await wait(() => expect(screen.queryByTestId('posts-list')).not.toBeInTheDocument());
    });
});