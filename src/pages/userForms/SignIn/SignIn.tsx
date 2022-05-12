import { Typography, TextField, Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
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
import { useAppDispatch, useAppSelector } from 'store/reducers/user/hooks';
import { loginUser } from 'store/reducers/user/userSlice';

type Inputs = {
  login: string;
  loginRequired: string;
  password: string;
  passwordRequired: string;
};

export function SignIn() {
  const backendError = useAppSelector((store) => store.userReducer.errorMessage);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const { inputs } = useSignIn(register);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    dispatch(loginUser(data));
    reset();
  };

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
          <StyledError>{backendError}</StyledError>
        </LoginError>
        <Button variant="outlined" type="submit">
          I am back!
        </Button>
      </StyledForm>
    </StyledBox>
  );
}
