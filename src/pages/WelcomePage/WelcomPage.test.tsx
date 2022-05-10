import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { WelcomePage } from './WelcomePage';

describe('WelcomePage', () => {
  test('renders correct', () => {
    render(
      <BrowserRouter>
        <WelcomePage />
      </BrowserRouter>
    );
    const element = screen.getByText(/Welcome/i);
    expect(element).toBeInTheDocument();
  });
});
