import { Typography, TextField, Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { registerUser } from 'store/reducers/user/userSlice';
import {
  ButtonGoBack,
  LoginError,
  Logo,
  StyledBox,
  StyledError,
  StyledForm,
  StyledInputBox,
} from '../Login.styled';
import { useUserData } from '../useMakeInput';
import { getLoginToken } from 'helpers/getLoginToken';

type Inputs = {
  name: string;
  nameRequired: string;
  login: string;
  loginRequired: string;
  password: string;
  passwordRequired: string;
};

export function SignUp() {
  const { errorMessage, isRegistered } = useAppSelector((store) => store.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = getLoginToken();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<Inputs>({ mode: 'onChange' });

  const { inputs } = useUserData(register, errors);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await dispatch(registerUser(data));
    reset();
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
            <LoginError>
              <StyledError>{input.errors}</StyledError>
            </LoginError>
          </StyledInputBox>
        ))}
        <LoginError>{<StyledError>{errorMessage}</StyledError>}</LoginError>
        <Button variant="outlined" type="submit" disabled={!isValid}>
          {t('Сreate!')}
        </Button>
      </StyledForm>
    </StyledBox>
  );
}
