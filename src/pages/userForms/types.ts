import { UseFormRegisterReturn } from 'react-hook-form';

export type UserInputs = {
  name: string;
  nameRequired: string;
  login: string;
  loginRequired: string;
  password: string;
  passwordRequired: string;
};

export type InputsSignIn = {
  login: string;
  loginRequired: string;
  password: string;
  passwordRequired: string;
};

export interface InputProperty {
  label: string;
  type: string;
  id: number;
  register?: UseFormRegisterReturn;
  error?: boolean;
  errors?: string;
}
