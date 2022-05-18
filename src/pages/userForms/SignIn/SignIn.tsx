import { Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  ButtonGoBack,
  LoginError,
  Logo,
  StyledBox,
  StyledError,
  StyledForm,
} from '../Login.styled';
import { useSignIn } from '../useMakeInput';
import { useAppDispatch, useAppSelector } from 'store/reducers/user/hooks';
import { loginUser } from 'store/reducers/user/userSlice';

type Inputs = {
  login: string;
  loginRequired: string;
  password: string;
  passwordRequired: string;
};

export function SignIn() {
  const { errorMessage, name, id } = useAppSelector((store) => store.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const { inputs } = useSignIn(register);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(loginUser(data));
    console.log(errorMessage, name, id);

    if (!errorMessage) {
      reset();
      navigate('/');
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
        {/* <LoginError>
          <StyledError>{backendError}</StyledError>
        </LoginError> */}
        <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => {}}>
          <Alert onClose={() => {}} severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
        <Button variant="outlined" type="submit">
          {t('I am back!')}
        </Button>
      </StyledForm>
    </StyledBox>
  );
}
