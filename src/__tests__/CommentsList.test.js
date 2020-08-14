import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, wait } from '@testing-library/react';
import mockAxios from 'axios';
import { fakeComment } from '../lib/testUtils';
import store from '../redux/store';
import CommentsList from '../components/CommentsList';

jest.mock('axios');
mockAxios.get.mockResolvedValue({
    data: [{ ...fakeComment() }]
});

describe('<CommentsList />', () => {
    it('renders loader while fetching data', () => {
        render(
            <Provider store={store}>
                <CommentsList />
            </Provider>, {
                wrapper: MemoryRouter
            }
        );

        screen.getByTestId('loader');
    });

    it('renders comments list and displays comments data after successfull api call', async () => {
        const fakeCommentData = fakeComment();
        
        render(
            <Provider store={store}>
                <CommentsList />
            </Provider>, {
                wrapper: MemoryRouter
            }
        );

        await wait(() => screen.getByTestId('comments-list'));
        await wait(() => screen.findByText(fakeCommentData.name));
        await wait(() => screen.findByText(fakeCommentData.email));
        await wait(() => screen.findByText(fakeCommentData.body));
    });

    it('displays an error after unsuccessfull data fetching', async () => {
        const errorMessage = 'API call was not successfull';
        
        mockAxios.get.mockRejectedValue({
            message: errorMessage
        });
        
        render(
            <Provider store={store}>
                <CommentsList />
            </Provider>, {
                wrapper: MemoryRouter
            }
        );

        await wait(() => screen.getByText(errorMessage));
        await wait(() => expect(screen.queryByTestId('comments-list')).not.toBeInTheDocument());
    });
});