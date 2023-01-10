import { render, screen } from '@testing-library/react';
import App from './App.js';

test('contains peep responsibly tag line', () => {

    // Arrange
    render(<App />);

    // Act
    const AppElement = screen.getByText(/Peep Responsibly/i);

    // Assert
    expect(AppElement).toBeInTheDocument();
});