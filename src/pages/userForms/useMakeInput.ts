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
    label: 'Your Name',
    type: 'text',
    id: 1,
    register: {
      ...register('name', {
        required: 'field is required',
        pattern: {
          value: /^[A-Za-zА-Яа-яЁё]{2,25}/,
          message: 'you can use only cyrillic or latin letters.',
        },
        minLength: {
          value: 2,
          message: 'your name should be more than 2 characters.',
        },
        maxLength: {
          value: 20,
          message: 'your name should be less then 20 characters.',
        },
      }),
    },
    error: errors?.name?.message ? true : false,
    errors: errors?.name?.message,
  };

  const loginInput: InputProperty = {
    label: 'Create your login',
    type: 'text',
    id: 2,
    register: {
      ...register('login', {
        required: 'field is required',
        minLength: {
          value: 2,
          message: 'your login should be more than 2 characters.',
        },
        maxLength: {
          value: 20,
          message: 'your login should be less then 20 characters.',
        },
      }),
    },
    error: errors?.login?.message ? true : false,
    errors: errors?.login?.message,
  };

  const passwordInput: InputProperty = {
    label: 'Create your password',
    type: 'password',
    id: 3,
    register: {
      ...register('password', {
        required: 'field is required',
        minLength: {
          value: 5,
          message: 'your password should be more than 5 characters.',
        },
        maxLength: {
          value: 10,
          message: 'your password should be less then 10 characters.',
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
    label: 'Enter your login',
    type: 'text',
    id: 1,
    register: { ...register('login') },
  };

  const passwordInput: InputProperty = {
    label: 'Enter your password',
    type: 'password',
    id: 2,
    register: { ...register('password') },
  };

  const inputs = [loginInput, passwordInput];

  return { inputs: inputs };
}
