import React from 'react';

import { Product } from '../types';
import { Link } from 'react-router-dom';

type Props = {
  collectedData: {};
  productType: Product;
};

const SummaryStep: React.FC<Props> = (props) => {
  const formatKey = (key: string) => {
    switch (key) {
      case 'firstName':
        return 'First Name';
      case 'lastName':
        return 'Last Name';
      case 'email':
        return 'E-mail';
      case 'age':
        return 'Age';
      default:
        return key;
    }
  };

  const getCollectedData = () =>
    Object.keys(props.collectedData).map((key, index) => {
      return (
        <div key={`${key}_${index}`}>
          <b>{formatKey(key)}</b>: {props.collectedData[key]}
        </div>
      );
    });

  return (
    <>
      {getCollectedData()}

      <div>
        <Link to={`/purchased=${props.productType}`}>Purchase</Link>
      </div>
    </>
  );
};

export default SummaryStep;
