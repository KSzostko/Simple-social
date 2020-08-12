import React from 'react';
import Modal from 'react-modal';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import store from '../redux/store';
import FormModal from '../components/FormModal';

const fakeData = {
    modalOpen: true,
    closeModal: () => {},
    userId: '1',
    postId: '1',
}

describe('<FormModal />', () => {
    it('renders post form if prop type=post', () => {
        Modal.setAppElement(document.createElement('div'));
        const { getByText, getByLabelText, queryByLabelText, queryByText } = render(
            <Provider store={store}>
                <FormModal {...fakeData} type="post" />
            </Provider>
        );

        getByText(/add post/i);
        getByLabelText(/title/i);
        getByLabelText(/body/i);

        expect(queryByText(/add comment/i)).not.toBeInTheDocument();
        expect(queryByLabelText(/name/i)).not.toBeInTheDocument();
        expect(queryByLabelText(/email/i)).not.toBeInTheDocument();
    });

    it('renders comment form if prop type=comment', () => {
        Modal.setAppElement(document.createElement('div'));
        const { getByText, getByLabelText, queryByText, queryByLabelText } = render(
            <Provider store={store}>
                <FormModal {...fakeData} type="comment" />
            </Provider>
        );

        getByText(/add comment/i);
        getByLabelText(/name/i);
        getByLabelText(/email/i);
        getByLabelText(/body/i);

        expect(queryByText(/add post/i)).not.toBeInTheDocument();
        expect(queryByLabelText(/title/i)).not.toBeInTheDocument();
    });
});