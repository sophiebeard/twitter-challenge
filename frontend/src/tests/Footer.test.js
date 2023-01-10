import { render } from '@testing-library/react';
import Footer from '../components/Layout/Footer';

test(`Footer matches snapshot`, () => {

    // Act
    const footerComponent = render(<Footer />);

    // Assert
    expect(footerComponent).toMatchSnapshot();
});