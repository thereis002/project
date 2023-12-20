import React from 'react';
import { render, screen } from '@testing-library/react';
import { Product } from '../types';
import { Wrap } from '../utils/test-utils';

import SummaryStepComponent from './SummaryStep';

const defaultProps: React.ComponentProps<typeof SummaryStepComponent> = {
  collectedData: {
    age: 0,
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
  },
  productType: Product.DESIGNER_INSURANCE,
};

const SummaryStep = (props: Partial<typeof defaultProps> = {}) => (
  <Wrap>
    <SummaryStepComponent {...defaultProps} {...props} />
  </Wrap>
);

describe('SummaryStep', () => {
  test('should render', () => {
    render(<SummaryStep />);

    expect(screen.getByText(/Age/i)).toBeInTheDocument();
    expect(screen.getByText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
  });

  test('should render fields with values', () => {
    render(
      <SummaryStep
        collectedData={{
          ...defaultProps.collectedData,
          firstName: '',
          lastName: '',
        }}
      />
    );

    expect(screen.getByText(/Age/i)).toBeInTheDocument();
    expect(screen.queryByText(/First Name/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Last Name/i)).not.toBeInTheDocument();
    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
  });

  Object.values(Product).forEach((item) => {
    test(`should redirect to the right purchase link for ${item}`, () => {
      render(<SummaryStep productType={item} />);

      const anchorElement = screen.getByTestId('PurchaseAnchor');
      expect(anchorElement).toHaveAttribute('href', `/purchased?id=${item}`);
    });
  });
});
