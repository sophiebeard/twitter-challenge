import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Authorisation/Login'

describe(`Login tests`, () => {

    beforeEach(() => {
        render(<MemoryRouter><Login /></MemoryRouter>);
    });

    it(`should render a submit button`, () => {

        // Act
        const submitButton = screen.getByRole(`button`);

        // Assert
        expect(submitButton).toBeInTheDocument();
    });

    it(`should have the login heading`, () => {

        // Act
        const heading = screen.getByRole(`heading`);

        // Assert
        expect(heading.textContent).toContain(`Log In`);
    });
});