import React from 'react';
import { render, screen, fireEvent, wait } from '@testing-library/react';
import mockAxios from 'axios';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { fakePost } from '../lib/testUtils';
import PostForm from '../components/PostForm';

jest.mock('axios');

const fakeData = {
    closeModal: () => {},
    userdId: '1',
};

describe('<PostForm />', () => {
    it('renders and matches the snapshot', () => {
        const { container } = render(
            <Provider store={store}>
                <PostForm {...fakeData} />
            </Provider>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('will not submit form if it is not fully filled out, it displays errors instead and disables the submit button', async () => {
        const fakePostData = fakePost();
        
        render(
            <Provider store={store}>
                <PostForm {...fakeData} />
            </Provider>
        );

        await wait(() => fireEvent.click(screen.getByText(/save/i)));
        expect(screen.getByText(/save/i)).toBeDisabled();

        await wait(() => fireEvent.change(screen.getByLabelText(/title/i), {
            target: {
                value: fakePostData.title,
            }
        }));
        expect(screen.getByText(/required/i)).toBeInTheDocument();
        expect(mockAxios.post).not.toHaveBeenCalled();
    });

    it('will submit form if it is fully filled out', async () => {
        const fakePostData = fakePost();

        mockAxios.post.mockResolvedValue();
        
        render(
            <Provider store={store}>
                <PostForm {...fakeData} />
            </Provider>
        );

        await wait(() => fireEvent.change(screen.getByLabelText(/title/i), {
            target: {
                value: fakePostData.title,
            }
        }));
        await wait(() => fireEvent.change(screen.getByLabelText(/body/i), {
            target: {
                value: fakePostData.body,
            }
        }));
        expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
        expect(screen.getByText(/save/i)).not.toBeDisabled();
        
        await wait(() => fireEvent.click(screen.getByText(/save/i)));
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
    });
});