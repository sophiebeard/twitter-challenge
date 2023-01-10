import { render } from '@testing-library/react';
import Header from '../components/Layout/Header';
import { MemoryRouter } from 'react-router-dom';

test(`Header matches snapshot`, () => {

    // Assert
    expect(render(<MemoryRouter><Header /></MemoryRouter>)).toMatchSnapshot();
});