import React from 'react';
import { render, screen, fireEvent, wait } from '@testing-library/react';
import mockAxios from 'axios';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { fakeComment } from '../lib/testUtils';
import CommentForm from '../components/CommentForm';

jest.mock('axios');

const fakeData = {
    closeModal: () => {},
    postId: '1',
};

describe('<CommentForm />', () => {
    it('renders and matches the snapshot', () => {
        const { container } = render(
            <Provider store={store}>
                <CommentForm {...fakeData} />
            </Provider>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('will not submit form if it is not fully filled out, it displays errors instead and disables the submit button', async () => {
        const fakeCommentData = fakeComment();
        
        render(
            <Provider store={store}>
                <CommentForm {...fakeData} />
            </Provider>
        );

        await wait(() => fireEvent.click(screen.getByText(/save/i)));
        expect(screen.getByText(/save/i)).toBeDisabled();

        await wait(() => fireEvent.change(screen.getByLabelText(/name/i), {
            target: {
                value: fakeCommentData.name,
            }
        }));
        await wait(() => fireEvent.change(screen.getByLabelText(/body/i), {
            target: {
                value: fakeCommentData.body,
            }
        }));
        expect(screen.getByText(/required/i)).toBeInTheDocument();
        expect(mockAxios.post).not.toHaveBeenCalled();
    });

    it('will not submit form if email format is not right', async () => {
        render(
            <Provider store={store}>
                <CommentForm {...fakeData} />
            </Provider>
        );

        await wait(() => fireEvent.click(screen.getByText(/save/i)));
        expect(screen.getByText(/save/i)).toBeDisabled();

        await wait(() => fireEvent.change(screen.getByLabelText(/email/i), {
            target: {
                value: 'email',
            }
        }));
        expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
        expect(mockAxios.post).not.toHaveBeenCalled();
    });

    it('will submit form if it is fully filled out', async () => {
        const fakePostData = fakeComment();

        mockAxios.post.mockResolvedValue();
        
        render(
            <Provider store={store}>
                <CommentForm {...fakeData} />
            </Provider>
        );

        await wait(() => fireEvent.change(screen.getByLabelText(/name/i), {
            target: {
                value: fakePostData.name,
            }
        }));
        await wait(() => fireEvent.change(screen.getByLabelText(/body/i), {
            target: {
                value: fakePostData.body,
            }
        }));
        await wait(() => fireEvent.change(screen.getByLabelText(/email/i), {
            target: {
                value: fakePostData.email,
            }
        }));
        expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
        expect(screen.getByText(/save/i)).not.toBeDisabled();
        
        await wait(() => fireEvent.click(screen.getByText(/save/i)));
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
    });
});