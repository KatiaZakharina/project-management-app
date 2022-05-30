import { Typography, TextField, Button, Alert } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import { ButtonGoBack, Logo, SnackbarStyled, StyledBox, StyledForm } from '../userForms.styled';
import { useSignIn } from '../useMakeInput';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { loginUser, resetErrorMessage } from 'store/reducers/user/userSlice';
import { getLoginToken } from 'helpers/getFromCookie';
import { InputsSignIn } from '../types';

export function SignIn() {
  const { isAuthorized, errorMessage } = useAppSelector((store) => store.userReducer);
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

  const { register, handleSubmit } = useForm<InputsSignIn>();

  const { inputs } = useSignIn(register);

  const onSubmit: SubmitHandler<InputsSignIn> = async (data) => {
    await dispatch(loginUser(data));
  };

  useEffect(() => {
    if (isAuthorized) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

  const { t } = useTranslation();

  return (
    <StyledBox>
      <ButtonGoBack variant="contained" onClick={() => navigate(-1)}>
        <ArrowBackIosIcon /> {t('Back')}
      </ButtonGoBack>
      <Logo />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Typography>{t('Welcome back to TLZ!')}</Typography>
        {inputs.map((input) => (
          <TextField
            key={input.id}
            label={input.label}
            type={input.type}
            {...input.register}
            autoComplete="off"
            fullWidth
          />
        ))}
        <SnackbarStyled open={!!errorMessage}>
          <Alert severity="warning" sx={{ width: '100%' }}>
            {t(errorMessage)}
          </Alert>
        </SnackbarStyled>
        <Button variant="outlined" type="submit">
          {t('I am back!')}
        </Button>
      </StyledForm>
    </StyledBox>
  );
}
