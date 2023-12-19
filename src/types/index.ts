export enum Product {
  DEV_INSURANCE = 'dev_ins',
  DESIGNER_INSURANCE = 'des_ins',
}

export enum Step {
  PERSONAL_INFO = 'PERSONAL_INFO',
  EMAIL = 'EMAIL',
  AGE = 'AGE',
}

export type DataToCollect = {
  email: string;
  firstName: string;
  lastName: string;
  age: number;
};
