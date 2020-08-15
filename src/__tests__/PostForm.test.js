import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { fakePost } from '../lib/testUtils';
import PostForm from '../components/PostForm';

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
});