import { render, screen } from '@testing-library/react';
import Register from '../components/Authorisation/Register';
import { MemoryRouter } from 'react-router-dom';

describe(`Register tests`, () => {

    beforeEach(() => {
        render(<MemoryRouter><Register /></MemoryRouter>);
    });

    it(`should have a submit button`, () => {

        // Act
        const submitButton = screen.getByRole(`button`);

        // Assert
        expect(submitButton).toBeInTheDocument();
    });

    it(`should have the registration heading`, () => {
        // Act
        const heading = screen.getByRole(`heading`);

        // Assert
        expect(heading.textContent).toContain(`Register`);
    });
});




