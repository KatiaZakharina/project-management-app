import { useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StyledForm, StyledTypography } from './EditingTitle.styled';

interface IEditingTitle {
  title: string | undefined;
  onTitleSubmit: SubmitHandler<{ title: string }>;
}

export const EditingTitle = ({ title, onTitleSubmit }: IEditingTitle) => {
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
            <TextField
              label="Title"
              type="text"
              {...register('title', {
                required: true,
              })}
              fullWidth
              defaultValue={title}
              error={errors?.title?.message ? true : false}
              autoComplete="off"
            />
            <IconButton title="Save" type="submit" color="primary">
              <SaveIcon />
            </IconButton>
            <IconButton color="primary" title="Cancel" onClick={() => setEdit(false)}>
              <HighlightOffIcon />
            </IconButton>
          </StyledForm>
        </>
      ) : (
        <StyledTypography variant="h5" onDoubleClick={() => setEdit(true)}>
          {title}
        </StyledTypography>
      )}
    </>
  );
};
