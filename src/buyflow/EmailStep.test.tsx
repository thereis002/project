import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmailStepComponent from './EmailStep';

const defaultProps: React.ComponentProps<typeof EmailStepComponent> = {
  email: '',
  handleOnChange: jest.fn,
  onNextClick: jest.fn,
};

const EmailStep = (props: Partial<typeof defaultProps> = {}) => (
  <EmailStepComponent {...defaultProps} {...props} />
);

describe('EmailStep', () => {
  test('should call handleOnChange with the correct email value', async () => {
    let email = '';

    const handleOnChangeMock = jest.fn((key) => (value) => {
      if (key === 'email') {
        email += value;
      }
    });

    render(<EmailStep email={email} handleOnChange={handleOnChangeMock} />);

    const user = userEvent.setup();
    const emailInput = screen.getByTestId('EmailInput');

    await user.type(emailInput, 'test@example.com');

    expect(handleOnChangeMock).toHaveBeenCalledWith('email');
    expect(email).toBe('test@example.com');
  });

  test('should enable the next button with a valid age', async () => {
    render(<EmailStep email={'test@example.com'} />);

    const nextElement = screen.getByText(/Next/i);
    expect(nextElement).toBeEnabled();
  });

  test('should not enable the next button with a invalid age', async () => {
    render(<EmailStep email={'invalidemail'} />);

    const nextElement = screen.getByText(/Next/i);

    expect(nextElement).not.toBeEnabled();
  });
});
