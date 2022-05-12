import { Typography, TextField, Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

import {
  ButtonGoBack,
  LoginError,
  Logo,
  StyledBox,
  StyledError,
  StyledForm,
} from '../Login.styled';
import { useSignIn } from '../useMakeInput';
import { loginServiceInstance } from 'service/userService';

type Inputs = {
  login: string;
  loginRequired: string;
  password: string;
  passwordRequired: string;
};

export function SignIn() {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [loginError, setLoginError] = useState(false);

  const { inputs } = useSignIn(register);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = (await loginServiceInstance.getToken(data)) as AxiosResponse;
    try {
      document.cookie = `user=${response.data.token};max-age=86400;samesite=lax;path=/`;
      setLoginError(false);
      reset();
    } catch {
      setLoginError(true);
    }
  };

  const navigate = useNavigate();

  return (
    <StyledBox>
      <ButtonGoBack variant="contained" onClick={() => navigate(-1)}>
        <ArrowBackIosIcon /> Back
      </ButtonGoBack>
      <Logo />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Typography>Welcome back to TLZ!</Typography>
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
        <LoginError>
          {loginError && <StyledError>Incorrect login or password...</StyledError>}
        </LoginError>
        <Button variant="outlined" type="submit">
          I am back!
        </Button>
      </StyledForm>
    </StyledBox>
  );
}
