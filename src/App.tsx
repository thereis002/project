import React from 'react';
import logo from './logo.svg';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Product, Step } from './types';

import Buyflow from './buyflow/Buyflow';

import './App.css';

type InsuranceRoute = {
  path: string;
  type: Product;
  steps: Step[];
};

const insurances: InsuranceRoute[] = [
  {
    path: '/buy/insurance_dev',
    type: Product.DEV_INSURANCE,
    steps: [Step.AGE, Step.EMAIL],
  },
  {
    path: '/buy/insurance_des',
    type: Product.DESIGNER_INSURANCE,
    steps: [Step.PERSONAL_INFO, Step.AGE, Step.EMAIL],
  },
];

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <Switch>
          {insurances.map((insurance) => (
            <Route key={`${insurance.path}`} path={insurance.path}>
              <Buyflow productId={insurance.type} steps={insurance.steps} />
            </Route>
          ))}

          <Route path="/">
            <p>Welcome to Getsafe's Insurances</p>

            <div>
              <div>
                <p>Developer insurance</p>
                <Link to="/buy/insurance_dev">Get started!</Link>
              </div>
              <div>
                <p>Designer insurance</p>
                <Link to="/buy/insurance_des">Get started!</Link>
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
