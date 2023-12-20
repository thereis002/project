import React from 'react';
import { render, screen } from '@testing-library/react';
import { Product, Step } from '../types';
import { Wrap } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';

import BuyflowComponent from './Buyflow';

const defaultProps: React.ComponentProps<typeof BuyflowComponent> = {
  productId: Product.DESIGNER_INSURANCE,
  steps: [],
};

const Buyflow = (props: Partial<typeof defaultProps> = {}) => (
  <Wrap>
    <BuyflowComponent {...defaultProps} {...props} />
  </Wrap>
);

describe('Buyflow', () => {
  describe('render', () => {
    [
      {
        item: Product.DESIGNER_INSURANCE,
        expected: /Designer Insurance/i,
      },
      {
        item: Product.DEV_INSURANCE,
        expected: /Developer Insurance/i,
      },
    ].forEach(({ item, expected }) => {
      test(`should render the buyflow for ${item}`, () => {
        render(<Buyflow productId={item} />);

        expect(screen.getByText(expected)).toBeInTheDocument();
      });
    });
  });

  test('should render with multiple steps', async () => {
    render(
      <Buyflow
        productId={Product.DEV_INSURANCE}
        steps={[Step.EMAIL, Step.AGE]}
      />
    );

    const user = userEvent.setup();
    const emailElement = screen.getByTestId('EmailInput');
    const nextElement = screen.getByText(/Next/i);

    await user.type(emailElement, 'test@example.com');
    await user.click(nextElement);

    expect(screen.getByText(/Age/i)).toBeInTheDocument();
  });

  test('should render SummaryStep as a last step', async () => {
    render(<Buyflow productId={Product.DEV_INSURANCE} steps={[Step.EMAIL]} />);

    const user = userEvent.setup();
    const emailElement = screen.getByTestId('EmailInput');
    const nextElement = screen.getByText(/Next/i);

    await user.type(emailElement, 'test@example.com');
    await user.click(nextElement);

    expect(screen.getByText(/Buying Developer Insurance/i)).toBeInTheDocument();
  });
});
