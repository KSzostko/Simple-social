import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { fakeUser } from '../lib/testUtils';
import UserItem from '../components/UserItem';

const fakeData = {
    data: { ...fakeUser() }
};

describe('<UserItem />', () => {
    it('renders and matches the snapshot', () => {
        const { container } = render(<UserItem {...fakeData} />, {
            wrapper: MemoryRouter,
        });

        expect(container.firstChild).toMatchSnapshot();
    });
});