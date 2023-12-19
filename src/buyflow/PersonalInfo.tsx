import React, { useRef } from 'react';
import { DataToCollect } from '../types';

type Props = {
  firstName: string;
  lastName: string;
  handleOnChange: (
    key: keyof DataToCollect
  ) => (value: string | number) => void;
  onNextClick: () => void;
};

const PersonalInfoStep: React.FC<Props> = (props) => {
  const firstNameRef = useRef<HTMLInputElement>();
  const lastNameRef = useRef<HTMLInputElement>();

  const _handleOnChange =
    (key: keyof DataToCollect) =>
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      props.handleOnChange(key)(value);
    };

  const isValid = () => props.firstName.length > 2 && props.lastName.length > 2;

  const _onClickNext = () => {
    if (!isValid()) {
      return;
    }

    props.onNextClick();
  };

  return (
    <>
      <div>
        <div>
          First Name:{' '}
          <input
            id="firstName"
            ref={firstNameRef}
            type="text"
            value={props.firstName}
            onChange={_handleOnChange('firstName')}
            minLength={2}
          />
        </div>

        <div>
          Last Name:{' '}
          <input
            id="lastName"
            ref={lastNameRef}
            type="text"
            value={props.lastName}
            onChange={_handleOnChange('lastName')}
            minLength={2}
          />
        </div>
      </div>

      <button disabled={!isValid()} onClick={_onClickNext}>
        Next
      </button>
    </>
  );
};

export default PersonalInfoStep;
