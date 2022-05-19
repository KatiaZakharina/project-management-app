import { Typography, TextField, Button, Alert } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import { ButtonGoBack, Logo, SnackbarStyled, StyledBox, StyledForm } from '../Login.styled';
import { useSignIn } from '../useMakeInput';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { loginUser } from 'store/reducers/user/userSlice';
import { getLoginToken } from 'helpers/getLoginToken';

type Inputs = {
  login: string;
  loginRequired: string;
  password: string;
  passwordRequired: string;
};

export function SignIn() {
  const { isAuthorized, errorMessage } = useAppSelector((store) => store.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = getLoginToken();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const { inputs } = useSignIn(register);

  useEffect(() => {
    if (isAuthorized) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await dispatch(loginUser(data));
    reset();
  };

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
