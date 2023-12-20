import React from 'react';
import { DataToCollect } from '../types';
import { isValidEmail } from '../utils/isValidEmail';

type Props = {
  email: DataToCollect['email'];
  handleOnChange: (
    key: keyof DataToCollect
  ) => (value: string | number) => void;
  onNextClick: () => void;
};

const EmailStep: React.FC<Props> = (props) => {
  const isValid = isValidEmail(props.email);

  const _handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    props.handleOnChange('email')(value);
  };

  const _onClickNext = () => {
    if (!isValid) {
      return;
    }

    props.onNextClick();
  };

  return (
    <>
      <div>
        Email:{' '}
        <input
          id="email"
          type="email"
          value={props.email}
          onChange={_handleOnChange}
          data-testid={'EmailInput'}
        />
      </div>

      <button disabled={!isValid} onClick={_onClickNext}>
        Next
      </button>
    </>
  );
};

export default EmailStep;
