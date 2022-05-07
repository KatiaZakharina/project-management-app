import { Typography, TextField, Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Logo, StyledBox, StyledError, StyledForm, StyledInputBox } from '../Login.styled';
import { useSignUp } from '../useMakeInput';

export function SignUp() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<Inputs>({ mode: 'onChange' });

  const { inputs } = useSignUp(register, errors);

  type Inputs = {
    name: string;
    nameRequired: string;
    login: string;
    loginRequired: string;
    password: string;
    passwordRequired: string;
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
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
            />
            <StyledError>{input.errors}</StyledError>
          </StyledInputBox>
        ))}
        <Button variant="outlined" type="submit" disabled={!isValid}>
          Сreate!
        </Button>
      </StyledForm>
    </StyledBox>
  );
}
