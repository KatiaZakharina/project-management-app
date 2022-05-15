import { Typography, TextField, Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'store/reducers/user/hooks';
import { registerUser } from 'store/reducers/user/userSlice';
import {
  ButtonGoBack,
  BackendError,
  Logo,
  StyledBox,
  StyledError,
  StyledForm,
  StyledInputBox,
} from '../userForms.styled';
import { useUserData } from '../useMakeInput';
import { UserInputs } from '../types';

export function SignUp() {
  const backendError = useAppSelector((store) => store.userReducer.errorMessage);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<UserInputs>({ mode: 'onChange' });

  const { inputs } = useUserData(register, errors);

  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
    await dispatch(registerUser(data));

    if (!backendError) {
      reset();
      navigate('/signin');
    }
  };

  const { t } = useTranslation();

  return (
    <StyledBox>
      <ButtonGoBack variant="contained" onClick={() => navigate(-1)}>
        <ArrowBackIosIcon /> {t('Back')}
      </ButtonGoBack>
      <Logo />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Typography>{t('Сreate your TLZ account')}</Typography>
        {inputs.map((input) => (
          <StyledInputBox key={input.id}>
            <TextField
              label={input.label}
              type={input.type}
              {...input.register}
              fullWidth
              error={input.error}
              autoComplete="off"
            />
            <StyledError>{input.errors}</StyledError>
          </StyledInputBox>
        ))}

        <BackendError>
          <StyledError>{backendError}</StyledError>
        </BackendError>
        <Button variant="outlined" type="submit" disabled={!isValid}>
          {t('Сreate!')}
        </Button>
      </StyledForm>
    </StyledBox>
  );
}
