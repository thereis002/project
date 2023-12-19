import React, { useState } from 'react';

import AgeStep from './AgeStep';
import EmailStep from './EmailStep';
import SummaryStep from './SummaryStep';
import PersonalInfoStep from './PersonalInfo';

import { DataToCollect, Product, Step } from '../types';
import { Link } from 'react-router-dom';

type BuyflowProps = {
  productId: Product;
  steps: Step[];
};

const PRODUCT_IDS_TO_NAMES: { [key in Product]: string } = {
  [Product.DEV_INSURANCE]: 'Developer Insurance',
  [Product.DESIGNER_INSURANCE]: 'Designer Insurance',
};

const Buyflow: React.FC<BuyflowProps> = ({ productId, steps }) => {
  const [currentStep, setStep] = useState<number>(0);

  const [collectedData, updateData] = useState<DataToCollect>({
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
  });

  const goToNextStep = () => {
    const nextStep = currentStep + 1;
    const isNextStepValid = nextStep <= steps.length - 1;

    setStep(isNextStepValid ? nextStep : -1); // -1 fallback to summary
  };

  const handleOnChange = (field: string) => (value: string | number) =>
    updateData({ ...collectedData, [field]: value });

  const renderStep = (stepNumber: number) => {
    const step = steps[stepNumber];

    switch (step) {
      case Step.PERSONAL_INFO:
        return (
          <PersonalInfoStep
            firstName={collectedData.firstName}
            lastName={collectedData.lastName}
            handleOnChange={handleOnChange}
            onNextClick={goToNextStep}
          />
        );
      case Step.EMAIL:
        return (
          <EmailStep
            email={collectedData.email}
            handleOnChange={handleOnChange}
            onNextClick={goToNextStep}
          />
        );
      case Step.AGE:
        return (
          <AgeStep
            age={collectedData.age}
            handleOnChange={handleOnChange}
            onNextClick={goToNextStep}
          />
        );
      default:
        return (
          <SummaryStep productType={productId} collectedData={collectedData} />
        );
    }
  };

  return (
    <div>
      <h4>Buying {PRODUCT_IDS_TO_NAMES[productId]}</h4>

      <div>{renderStep(currentStep)}</div>

      <Link to="/">Cancel</Link>
    </div>
  );
};

export default Buyflow;
