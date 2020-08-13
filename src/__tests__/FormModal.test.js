import React from 'react';
import Modal from 'react-modal';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
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
        render(
            <Provider store={store}>
                <FormModal {...fakeData} type="post" />
            </Provider>
        );

        screen.getByText(/add post/i);
        screen.getByLabelText(/title/i);
        screen.getByLabelText(/body/i);

        expect(screen.queryByText(/add comment/i)).not.toBeInTheDocument();
        expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument();
        expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
    });

    it('renders comment form if prop type=comment', () => {
        Modal.setAppElement(document.createElement('div'));
        render(
            <Provider store={store}>
                <FormModal {...fakeData} type="comment" />
            </Provider>
        );

        screen.getByText(/add comment/i);
        screen.getByLabelText(/name/i);
        screen.getByLabelText(/email/i);
        screen.getByLabelText(/body/i);

        expect(screen.queryByText(/add post/i)).not.toBeInTheDocument();
        expect(screen.queryByLabelText(/title/i)).not.toBeInTheDocument();
    });
});