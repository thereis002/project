import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PersonalInfoComponent from './PersonalInfo';

const defaultProps: React.ComponentProps<typeof PersonalInfoComponent> = {
  firstName: '',
  lastName: '',
  handleOnChange: jest.fn,
  onNextClick: jest.fn,
};

const PersonalInfoStep = (props: Partial<typeof defaultProps> = {}) => (
  <PersonalInfoComponent {...defaultProps} {...props} />
);

describe('PersonalInfoStep', () => {
  test('should call handleOnChange with the correct email value', async () => {
    let firstName = '';
    let lastName = '';

    const handleOnChangeMock = jest.fn((key) => (value) => {
      if (key === 'firstName') {
        firstName += value;
      }

      if (key === 'lastName') {
        lastName += value;
      }
    });

    render(
      <PersonalInfoStep
        firstName={firstName}
        lastName={lastName}
        handleOnChange={handleOnChangeMock}
      />
    );

    const user = userEvent.setup();

    const firstNameInput = screen.getByTestId('FirstNameInput');
    const lastNameInput = screen.getByTestId('LastNameInput');

    await user.type(firstNameInput, 'Lorem');
    await user.type(lastNameInput, 'Ipsum');

    expect(handleOnChangeMock).toHaveBeenCalledWith('firstName');
    expect(firstName).toBe('Lorem');

    expect(handleOnChangeMock).toHaveBeenCalledWith('lastName');
    expect(lastName).toBe('Ipsum');
  });

  test('should enable the next button with valid first and last name', async () => {
    render(<PersonalInfoStep firstName="John" lastName="Doe" />);

    const nextElement = screen.getByText(/Next/i);
    expect(nextElement).toBeEnabled();
  });

  [
    {
      firstName: '',
      lastName: '',
    },
    {
      firstName: 'L',
      lastName: '',
    },
    {
      firstName: 'Lu',
      lastName: '',
    },
    {
      firstName: 'Lu',
      lastName: 'I',
    },
    {
      firstName: 'L',
      lastName: 'Ip',
    },
    {
      firstName: 'Lo',
      lastName: 'Ip',
    },
  ].forEach(({ firstName, lastName }) => {
    test(`should not enable the next button with a invalid first and last name, ${firstName} ${lastName}`, async () => {
      render(<PersonalInfoStep firstName={firstName} lastName={lastName} />);

      const nextElement = screen.getByText(/Next/i);

      expect(nextElement).not.toBeEnabled();
    });
  });
});
