import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen, fireEvent, wait } from '@testing-library/react';
import mockAxios from 'axios';
import Modal from 'react-modal';
import { createMemoryHistory } from 'history';
import { fakeUser, fakePost, fakeComment } from '../lib/testUtils';
import Root from '../views/Root';

jest.mock('axios');

describe('<Root />', () => {
    it('renders UsersPage and UserDetails views properly and submits properly filled out post form', async () => {
        const { name } = fakeUser();
        Modal.setAppElement(document.createElement('div'));
        mockAxios.get.mockResolvedValueOnce({
            data: [{ ...fakeUser() }]
        });

        const history = createMemoryHistory({initialEntries: ['/']});
        render(
            <Router history={history}>
                <Root />
            </Router>
        );

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

        // for some reason router state won't change to initial in second test if i don't do that manually here
        // I'm not sure why solution from the docs doesn't work
        mockAxios.get.mockResolvedValueOnce({
            data: [{ ...fakeUser() }]
        });
        fireEvent.click(screen.getByTestId('back-button'));
    });

    it('renders every view properly and submits properly filled out comment form', async () => {
        const { name } = fakeUser();
        Modal.setAppElement(document.createElement('div'));
        mockAxios.get.mockResolvedValueOnce({
            data: [{ ...fakeUser() }]
        });

        const history = createMemoryHistory({initialEntries: ['/']});
        render(
            <Router history={history}>
                <Root />
            </Router>
        );

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

        const fakeCommentData = fakeComment();
        mockAxios.get.mockResolvedValueOnce({
            data: [{ ...fakeCommentData }]
        });
        fireEvent.click(screen.getByTestId('arrow-button'));
        expect(screen.queryByTestId('comments-list')).not.toBeInTheDocument();
        expect(screen.queryByText(/add comment/i)).not.toBeInTheDocument();
        fireEvent.click(screen.getByText(/show comments/i));
        screen.getByTestId('loader');
        expect(screen.queryByText(/show comments/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/hide comments/i)).toBeInTheDocument();
        await wait(() => screen.getByText(fakeCommentData.name));

        mockAxios.post.mockResolvedValueOnce();
        fireEvent.click(screen.getByText(/add comment/i));
        screen.getByText(/add comment/i, { selector: 'h2' });
        await wait(() => fireEvent.change(screen.getByLabelText(/name/i), {
            target: {
                value: fakeCommentData.name,
            }
        }));
        expect(screen.getByText(/save/i)).toBeDisabled();
        await wait(() => fireEvent.change(screen.getByLabelText(/body/i), {
            target: {
                value: fakeCommentData.body,
            }
        }));
        await wait(() => fireEvent.change(screen.getByLabelText(/email/i), {
            target: {
                value: fakeCommentData.email,
            }
        }));
        expect(screen.getByText(/save/i)).not.toBeDisabled();
        await wait(() => fireEvent.click(screen.getByText(/save/i)));
        expect(mockAxios.post).toHaveBeenCalled();
    });
});