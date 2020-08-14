import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, wait, fireEvent } from '@testing-library/react';
import mockAxios from 'axios';
import { fakePost } from '../lib/testUtils';
import store from '../redux/store';
import PostsList from '../components/PostsList';

jest.mock('axios');

describe('<PostsList />', () => {
    it('renders loader while fetching data', () => {
        mockAxios.get.mockResolvedValue({
            data: [{ ...fakePost() }]
        });
        
        render(
            <Provider store={store}>
                <PostsList />
            </Provider>, {
                wrapper: MemoryRouter
            }
        );

        screen.getByTestId('loader');
    });

    it('renders posts list and displays posts data after successfull api call', async () => {
        const fakePostData = fakePost();

        mockAxios.get.mockResolvedValue({
            data: [{ ...fakePost() }]
        });
        
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
    
    it('displays loader after trash button had been clicked', async () => {
        mockAxios.get.mockResolvedValue({
            data: [{ ...fakePost() }]
        });
        mockAxios.delete.mockResolvedValue();
        
        render(
            <Provider store={store}>
                <PostsList />
            </Provider>, {
                wrapper: MemoryRouter
            }
        );
        
        await wait(() => screen.getByTestId('posts-list'));
        
        fireEvent.click(screen.getByTestId('trash-button'));
        screen.getByTestId('loader');
    });
    
    it('after trash button was clicked, the post was deleted from the list', async () => {
        const fakePostData = fakePost();
        
        mockAxios.get.mockResolvedValue({
            data: [{ ...fakePost() }]
        });
        mockAxios.delete.mockResolvedValue();
        
        render(
            <Provider store={store}>
                <PostsList />
            </Provider>, {
                wrapper: MemoryRouter
            }
        );
        
        await wait(() => screen.getByTestId('posts-list'));
        
        fireEvent.click(screen.getByTestId('trash-button'));
        await wait(() => screen.getByTestId('posts-list'));
        await wait(() => expect(screen.queryByText(fakePostData.title)).not.toBeInTheDocument());
    });
    
    it('after trash button was clicked and delete operation was not successful, error has been displayed', async () => {
        const errorMessage = 'API call was not successfull';
        
        mockAxios.get.mockResolvedValue({
            data: [{ ...fakePost() }]
        });
        mockAxios.delete.mockRejectedValue({
            message: errorMessage
        });
        
        render(
            <Provider store={store}>
                <PostsList />
            </Provider>, {
                wrapper: MemoryRouter
            }
        );
        
        await wait(() => screen.getByTestId('posts-list'));
        
        fireEvent.click(screen.getByTestId('trash-button'));
        await wait(() => screen.getByText(errorMessage));
        await wait(() => expect(screen.queryByTestId('posts-list')).not.toBeInTheDocument());
    });
});