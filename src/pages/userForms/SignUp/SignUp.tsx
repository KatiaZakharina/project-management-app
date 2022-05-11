import { Typography, TextField, Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from 'store/reducers/user/hooks';
import { registerUser } from 'store/reducers/user/userSlice';
import {
  LoginError,
  Logo,
  StyledBox,
  StyledError,
  StyledForm,
  StyledInputBox,
} from '../Login.styled';
import { useUserData } from '../useMakeInput';

export function SignUp() {
  const backendError = useAppSelector((store) => store.userReducer.errorMessage);
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<Inputs>({ mode: 'onChange' });

  const { inputs } = useUserData(register, errors);

  type Inputs = {
    name: string;
    nameRequired: string;
    login: string;
    loginRequired: string;
    password: string;
    passwordRequired: string;
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    dispatch(registerUser(data));
  };

  return (
    <StyledBox>
      <Logo />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Typography>Сreate your TLZ account</Typography>
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
        <LoginError>{<StyledError>{backendError}</StyledError>}</LoginError>
        <Button variant="outlined" type="submit" disabled={!isValid}>
          Сreate!
        </Button>
      </StyledForm>
    </StyledBox>
  );
}
