import { t } from 'i18next';
import { FieldErrors, UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';

type Inputs = {
  name: string;
  nameRequired: string;
  login: string;
  loginRequired: string;
  password: string;
  passwordRequired: string;
};

type InputsSignIn = {
  login: string;
  loginRequired: string;
  password: string;
  passwordRequired: string;
};

interface InputProperty {
  label: string;
  type: string;
  id: number;
  register?: UseFormRegisterReturn;
  error?: boolean;
  errors?: string;
}

export function useUserData(register: UseFormRegister<Inputs>, errors: FieldErrors) {
  const nameInput: InputProperty = {
    label: t('Name'),
    type: 'text',
    id: 1,
    register: {
      ...register('name', {
        pattern: {
          value: /^[A-Za-zА-Яа-яЁё]{2,25}/,
          message: t('you can use only cyrillic or latin letters'),
        },
        minLength: {
          value: 2,
          message: t('your name should be more than 2 characters'),
        },
        maxLength: {
          value: 20,
          message: t('your name should be less then 20 characters'),
        },
      }),
    },
    error: errors?.name?.message ? true : false,
    errors: errors?.name?.message,
  };

  const loginInput: InputProperty = {
    label: t('Login'),
    type: 'text',
    id: 2,
    register: {
      ...register('login', {
        minLength: {
          value: 2,
          message: t('your login should be more than 2 characters'),
        },
        maxLength: {
          value: 20,
          message: t('your login should be less then 20 characters'),
        },
      }),
    },
    error: errors?.login?.message ? true : false,
    errors: errors?.login?.message,
  };

  const passwordInput: InputProperty = {
    label: t('Password'),
    type: 'password',
    id: 3,
    register: {
      ...register('password', {
        minLength: {
          value: 5,
          message: t('your password should be more than 5 characters'),
        },
        maxLength: {
          value: 10,
          message: t('your password should be less then 10 characters'),
        },
      }),
    },
    error: errors?.password?.message ? true : false,
    errors: errors?.password?.message,
  };

  const inputs = [nameInput, loginInput, passwordInput];

  return { inputs: inputs };
}

export function useSignIn(register: UseFormRegister<InputsSignIn>) {
  const loginInput: InputProperty = {
    label: t('Enter your login'),
    type: 'text',
    id: 1,
    register: { ...register('login') },
  };

  const passwordInput: InputProperty = {
    label: t('Enter your password'),
    type: 'password',
    id: 2,
    register: { ...register('password') },
  };

  const inputs = [loginInput, passwordInput];

  return { inputs: inputs };
}
