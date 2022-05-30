import { t } from 'i18next';
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
  content?: string;
}

export function createNewTask(
  register: UseFormRegister<Inputs>,
  titleContent?: string,
  descriptionContent?: string
) {
  const titleInput: InputProperty = {
    label: t('Title task'),
    variant: 'outlined',
    placeholder: t('Title for your task'),
    multiline: false,
    id: 1,
    register: {
      ...register('title', {
        required: 'field is required',
      }),
    },
    content: titleContent,
  };

  const descriptionInput: InputProperty = {
    label: t('Description task'),
    variant: 'outlined',
    multiline: true,
    rows: 4,
    id: 2,
    register: {
      ...register('description', {
        required: 'field is required',
      }),
    },
    placeholder: t('Description for your task'),
    content: descriptionContent,
  };

  const inputs = [titleInput, descriptionInput];

  return { inputs: inputs };
}
