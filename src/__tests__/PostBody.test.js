import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { fakePost } from '../lib/testUtils';
import PostBody from '../components/PostBody';

describe('<PostBody />', () => {
    it('renders component correctly', () => {
        render(<PostBody {...fakePost()} />);

        expect(screen.getByText(/Post title/)).toBeInTheDocument();
        expect(screen.getByText(/Post body/)).toBeInTheDocument();
    });
});