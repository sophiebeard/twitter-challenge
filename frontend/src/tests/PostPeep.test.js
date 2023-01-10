import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PostPeep from '../components/PostPeep';

describe(`PostPeep tests`, () => {

    const testPeeper = {};

    beforeEach(() => {
        render(<MemoryRouter><PostPeep user={testPeeper} /></MemoryRouter>);
    });

    it(`should have a submit button`, () => {

        // Act
        const submit = screen.getByRole(`button`);

        // Assert
        expect(submit).toBeInTheDocument();
    });

    it(`should have the title for the page`, () => {

        // Act
        const title = screen.getByRole(`heading`);

        // Assert
        expect(title.textContent).toContain(`What's on your mind`);
    });
});