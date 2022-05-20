import { UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';

export type Inputs = {
  title: string;
  titleRequired: string;
  description: string;
  descriptionRequired: string;
  executor: string;
  executorRequired: string;
};

interface InputProperty {
  label: string;
  variant: 'standard' | 'filled' | 'outlined' | undefined;
  multiline: boolean;
  placeholder: string;
  rows?: number;
  id: number;
  register?: UseFormRegisterReturn;
}

export function useCreateNewTask(register: UseFormRegister<Inputs>) {
  const titleInput: InputProperty = {
    label: 'Title task',
    variant: 'outlined',
    placeholder: 'Title for your task',
    multiline: false,
    id: 1,
    register: {
      ...register('title', {
        required: 'field is required',
      }),
    },
  };

  const descriptionInput: InputProperty = {
    label: 'Description task',
    variant: 'outlined',
    multiline: true,
    rows: 4,
    id: 2,
    register: {
      ...register('description', {
        required: 'field is required',
      }),
    },
    placeholder: '',
  };

  const inputs = [titleInput, descriptionInput];

  return { inputs: inputs };
}
