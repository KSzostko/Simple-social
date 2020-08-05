import React from 'react';
import { render } from '@testing-library/react';
import { fakeComment } from '../lib/testUtils';
import CommentItem from '../components/CommentItem';

const fakeData = {
    data: { ...fakeComment() }
};

describe('<CommentItem />', () => {
    it('renders and matches the snapshot', () => {
        const { container } = render(<CommentItem {...fakeData} />);

        expect(container.firstChild).toMatchSnapshot();
    });
});