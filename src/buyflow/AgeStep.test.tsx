import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AgeStepComponent from './AgeStep';

const defaultProps: React.ComponentProps<typeof AgeStepComponent> = {
  age: 0,
  handleOnChange: jest.fn,
  onNextClick: jest.fn,
};

const AgeStep = (props: Partial<typeof defaultProps> = {}) => (
  <AgeStepComponent {...defaultProps} {...props} />
);

describe('AgeStep', () => {
  test('should call handleOnChange with the correct age value', async () => {
    let age = '';

    const handleOnChangeMock = jest.fn((key) => (value) => {
      if (key === 'age') {
        age += value;
      }
    });

    render(<AgeStep age={Number(age)} handleOnChange={handleOnChangeMock} />);

    const user = userEvent.setup();
    const ageInput = screen.getByTestId('AgeInput');

    await user.type(ageInput, '21');

    expect(handleOnChangeMock).toHaveBeenCalledWith('age');
    expect(age).toBe('21');
  });

  test('should enable the next button with a valid age', async () => {
    render(<AgeStep age={21} />);

    const nextElement = screen.getByText(/Next/i);
    expect(nextElement).toBeEnabled();
  });

  test('should not enable the next button with a invalid age', async () => {
    render(<AgeStep age={100} />);

    const nextElement = screen.getByText(/Next/i);

    expect(nextElement).not.toBeEnabled();
  });
});
