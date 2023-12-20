import React, { useRef } from 'react';
import { DataToCollect } from '../types';

type Props = {
  age: DataToCollect['age'];
  handleOnChange: (
    key: keyof DataToCollect
  ) => (value: string | number) => void;
  onNextClick: () => void;
};

const AgeStep: React.FC<Props> = (props) => {
  const ref = useRef<HTMLInputElement>();

  // const { isValid } = useNativeValidation(ref);

  const minAge = 18;
  const maxAge = 99;

  const isValid = props.age >= minAge && props.age <= maxAge;

  const _handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    props.handleOnChange('age')(value);
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
        Age:{' '}
        <input
          ref={ref}
          id="age"
          type="number"
          value={props.age}
          onChange={_handleOnChange}
          min={minAge}
          max={maxAge}
          data-testid="AgeInput"
        />
      </div>

      <button disabled={!isValid} onClick={_onClickNext}>
        Next
      </button>
    </>
  );
};

export default AgeStep;
