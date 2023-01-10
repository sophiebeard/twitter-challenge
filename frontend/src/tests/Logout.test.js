import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Logout from '../components/Logout';

describe(`Logout tests`, () => {

    beforeEach(() => {
        render(<MemoryRouter><Logout /></MemoryRouter>);
    });

    it(`should render a submit button`, () => {

        // Act
        const submitButton = screen.getByRole(`button`);

        // Assert
        expect(submitButton).toBeInTheDocument();
    });

    it(`should have the logout heading`, () => {

        // Act
        const heading = screen.getByRole(`heading`);

        // Assert
        expect(heading.textContent).toContain(`Would you like to log out?`);
    });
});