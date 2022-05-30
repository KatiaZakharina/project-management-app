import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { SubmitHandler, useForm } from 'react-hook-form';
import { t } from 'i18next';

import {
  StyledForm,
  StyledTextField,
  StyledTypography,
  StyledIconButton,
} from './EditingTitle.styled';

interface IEditingTitle {
  title: string | undefined;
  onTitleSubmit: SubmitHandler<{ title: string }>;
  styles: 'h6' | 'h5';
}

export const EditingTitle = ({ title, onTitleSubmit, styles }: IEditingTitle) => {
  const [edit, setEdit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>();

  const onSubmit: SubmitHandler<{ title: string }> = async (data) => {
    onTitleSubmit(data);
    setEdit(false);
  };

  return (
    <>
      {edit ? (
        <>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <StyledTextField
              label="Title"
              type="text"
              {...register('title', {
                required: 'true',
              })}
              fullWidth
              defaultValue={title}
              error={errors?.title?.message ? true : false}
              autoComplete="off"
            />
            <StyledIconButton color="primary" title={t('Cancel')} onClick={() => setEdit(false)}>
              <HighlightOffIcon />
            </StyledIconButton>
            <StyledIconButton title={t('Save')} type="submit" color="primary">
              <SaveIcon />
            </StyledIconButton>
          </StyledForm>
        </>
      ) : (
        <StyledTypography variant={styles} onDoubleClick={() => setEdit(true)}>
          {title}
        </StyledTypography>
      )}
    </>
  );
};
