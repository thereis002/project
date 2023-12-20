import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('should render', () => {
    render(<App />);

    const welcomeElement = screen.getByText(/Welcome/i);
    expect(welcomeElement).toBeInTheDocument();

    // To have 2 insurances
    expect(screen.getAllByText(/Get started!/i)).toHaveLength(2);
  });
});
