import React, { useRef } from 'react';
import { useNativeValidation } from '../hooks/useNativeValidation';

type Props = {
  age: number;
  handleOnChange: (field: string) => (value: string | number) => void;
  onNextClick: () => void;
};

const AgeStep: React.FC<Props> = (props) => {
  const ref = useRef<HTMLInputElement>();

  const { isValid } = useNativeValidation(ref);

  const _handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    props.handleOnChange('age')(value);
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
        Age:{' '}
        <input
          ref={ref}
          type="number"
          value={props.age}
          onChange={_handleOnChange}
          min={1}
          max={99}
        />
      </div>

      <button disabled={!isValid()} onClick={_onClickNext}>
        Next
      </button>
    </>
  );
};

export default AgeStep;
