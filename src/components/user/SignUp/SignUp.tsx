import { Typography, TextField, Button } from '@mui/material';

import { Logo, StyledBox, StyledForm } from '../Login.styled';

export function SignUp() {
  return (
    <StyledBox>
      <Logo />
      <StyledForm>
        <Typography>Сreate your TLZ account</Typography>
        <TextField label="Your Name" type="text" fullWidth />
        <TextField label="Create your login" type="text" fullWidth />
        <TextField label="Create your password" type="password" fullWidth />
        <Button variant="outlined">Сreate!</Button>
      </StyledForm>
    </StyledBox>
  );
}
