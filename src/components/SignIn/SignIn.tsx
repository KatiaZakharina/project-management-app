import { Typography, TextField, Button } from '@mui/material';

import { Logo, StyledSignUp, StyledSignUpForm } from './SignIn.styled';

export function SignIn() {
  return (
    <StyledSignUp>
      <Logo />
      <StyledSignUpForm>
        <Typography>Welcome back to TLZ!</Typography>
        <TextField label="Enter your login" type="text" fullWidth />
        <TextField label="Enter your password" type="password" fullWidth />
        <Button variant="outlined">I am back!</Button>
      </StyledSignUpForm>
    </StyledSignUp>
  );
}
