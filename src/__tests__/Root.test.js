import React from 'react';
import { render, screen, fireEvent, wait } from '@testing-library/react';
import mockAxios from 'axios';
import Modal from 'react-modal';
import { fakeUser, fakePost } from '../lib/testUtils';
import Root from '../views/Root';

jest.mock('axios');

describe('<Root />', () => {
    it('renders UsersPage and UserDetails views properly and submits properly filled out post form', async () => {
        const { name } = fakeUser();
        Modal.setAppElement(document.createElement('div'));
        mockAxios.get.mockResolvedValueOnce({
            data: [{ ...fakeUser() }]
        });
        
        render(<Root />);

        screen.getByTestId('loader');
        await wait(() => screen.getByTestId('users-list'));
        screen.getByText(name);
        expect(screen.queryByTestId('loader')).not.toBeInTheDocument();

        const fakePostData = fakePost();
        mockAxios.get.mockResolvedValueOnce({
            data: [{ ...fakePostData }]
        });
        fireEvent.click(screen.getByText(/details/i));
        screen.getByTestId('loader');
        screen.getByText(name);
        await wait(() => screen.getByTestId('posts-list'));
        screen.getByText(fakePostData.title);
        expect(screen.queryByTestId('loader')).not.toBeInTheDocument();

        fireEvent.click(screen.getByText('+'));
        screen.getByText(/add post/i);
        fireEvent.click(screen.getByText(/cancel/i));
        expect(screen.queryByText(/add post/i)).not.toBeInTheDocument();

        mockAxios.post.mockResolvedValueOnce();
        fireEvent.click(screen.getByText('+'));
        await wait(() => fireEvent.change(screen.getByLabelText(/title/i), {
            target: {
                value: 'New Post',
            }
        }));
        expect(screen.getByText(/save/i)).toBeDisabled();
        await wait(() => fireEvent.change(screen.getByLabelText(/body/i), {
            target: {
                value: 'New Post body',
            }
        }));
        expect(screen.getByText(/save/i)).not.toBeDisabled();
        await wait(() => fireEvent.click(screen.getByText(/save/i)));
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
    });
});