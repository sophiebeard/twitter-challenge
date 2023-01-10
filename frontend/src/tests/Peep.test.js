import { render, screen } from '@testing-library/react';
import Peep from '../components/Peep';

describe(`Peep card tests`, () => {

    const testPeep = {
        id: 1,
        namePeep: `Molly`,
        lastNamePeep: `Beard`,
        username: `mbeard96`,
        timePeep: `2022-12-06T16:53:00.000Z`,
        textPeep: `Test Peep`
    };

    beforeEach(() => {
        render(<Peep props={testPeep} />);
    });

    it(`should render a peep`, () => {

        // Act
        const contentPeep = screen.getByText(`Test Peep`);

        // Assert
        expect(contentPeep).toBeInTheDocument();
    });

    it(`should render the user's name`, () => {

        // Act
        const namePeep = screen.getByText(`Molly Beard`);

        // Assert 
        expect(namePeep.textContent).toContain(`Molly Beard`);
    });

    it(`should render the user's last name`, () => {

        // Act
        const lastNamePeep = screen.getByText(`Molly Beard`);

        // Assert 
        expect(lastNamePeep.textContent).toContain(`Molly Beard`);
    });

    it(`should format the correct time`, () => {

        // Act
        const time = screen.getByText(`16:53:00 - Tue Dec 06 2022`);

        expect(time.textContent).toContain(`16:53:00`);
    });

    it(`should format the correct date`, () => {

        // Act
        const date = screen.getByText(`16:53:00 - Tue Dec 06 2022`);

        expect(date.textContent).toContain(`Tue Dec 06 2022`);
    });
});