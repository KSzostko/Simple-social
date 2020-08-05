import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { fakePost } from '../lib/testUtils';
import PostBody from '../components/PostBody';

describe('<PostBody />', () => {
    it('renders component correctly', () => {
        const { getByText } = render(<PostBody {...fakePost()} />);

        expect(getByText(/Post title/)).toBeInTheDocument();
        expect(getByText(/Post body/)).toBeInTheDocument();
    });
});