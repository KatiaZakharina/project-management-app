import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  test('renders correct', () => {
    render(<Footer />);
    const element = screen.getByText(/Daria/i);
    expect(element).toBeInTheDocument();
  });
});
