import React, { useRef } from 'react';
import { useNativeValidation } from '../hooks/useNativeValidation';
import { DataToCollect } from '../types';

type Props = {
  email: string;
  handleOnChange: (
    key: keyof DataToCollect
  ) => (value: string | number) => void;
  onNextClick: () => void;
};

const EmailStep: React.FC<Props> = (props) => {
  const ref = useRef<HTMLInputElement>();

  const { isValid } = useNativeValidation(ref);

  const _handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    props.handleOnChange('email')(value);
  };

  const _onClickNext = () => {
    if (!isValid()) {
      return;
    }

    props.onNextClick();
  };

  return (
    <>
      <div>
        Email:{' '}
        <input
          ref={ref}
          type="email"
          value={props.email}
          onChange={_handleOnChange}
        />
      </div>

      <button disabled={!isValid()} onClick={_onClickNext}>
        Next
      </button>
    </>
  );
};

export default EmailStep;
