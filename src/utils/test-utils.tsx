import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

type WrapProps = {
  children: React.ReactElement;
};
export const Wrap: FC<WrapProps> = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);
