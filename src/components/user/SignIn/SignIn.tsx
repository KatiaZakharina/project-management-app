import { Typography, TextField, Button } from '@mui/material';

import { Logo, StyledBox, StyledForm } from '../Login.styled';

export function SignIn() {
  return (
    <StyledBox>
      <Logo />
      <StyledForm>
        <Typography>Welcome back to TLZ!</Typography>
        <TextField label="Enter your login" type="text" fullWidth />
        <TextField label="Enter your password" type="password" fullWidth />
        <Button variant="outlined">I am back!</Button>
      </StyledForm>
    </StyledBox>
  );
}
