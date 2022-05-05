import { Typography, TextField, Button } from '@mui/material';

import { Logo, StyledSignUp, StyledSignUpForm } from './SignUp.styled';

export function SignUp() {
  return (
    <StyledSignUp>
      <Logo />
      <StyledSignUpForm>
        <Typography>Сreate your TLZ account</Typography>
        <TextField label="Your Name" type="text" fullWidth />
        <TextField label="Create your login" type="text" fullWidth />
        <TextField label="Create your password" type="password" fullWidth />
        <Button variant="outlined">Сreate!</Button>
      </StyledSignUpForm>
    </StyledSignUp>
  );
}
