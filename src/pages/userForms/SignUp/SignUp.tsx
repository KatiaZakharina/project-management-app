import { Typography, TextField, Button, Alert } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { registerUser, resetErrorMessage } from 'store/reducers/user/userSlice';
import {
  ButtonGoBack,
  Logo,
  SnackbarStyled,
  StyledBox,
  StyledError,
  StyledForm,
  StyledInputBox,
} from '../userForms.styled';
import { useUserData } from '../useMakeInput';
import { getLoginToken } from 'helpers/getFromCookie';
import { UserInputs } from '../types';

export function SignUp() {
  const { errorMessage, isRegistered } = useAppSelector((store) => store.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = getLoginToken();

  useEffect(() => {
    if (token) {
      navigate('/');
    }

    dispatch(resetErrorMessage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<UserInputs>({ mode: 'onChange' });

  const { inputs } = useUserData(register, errors);

  const onSubmit: SubmitHandler<UserInputs> = async (data) => {
    await dispatch(registerUser(data));
  };

  useEffect(() => {
    if (isRegistered) {
      navigate('/signin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegistered]);

  const { t } = useTranslation();

  return (
    <StyledBox>
      <ButtonGoBack variant="contained" onClick={() => navigate(-1)}>
        <ArrowBackIosIcon /> {t('Back')}
      </ButtonGoBack>
      <Logo />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Typography>{t('Create your TLZ account')}</Typography>
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
        <SnackbarStyled open={!!errorMessage}>
          <Alert severity="warning" sx={{ width: '100%' }}>
            {t(errorMessage)}
          </Alert>
        </SnackbarStyled>
        <Button variant="outlined" type="submit" disabled={!isValid}>
          {t('Create!')}
        </Button>
      </StyledForm>
    </StyledBox>
  );
}
