import { Typography, TextField, Button } from '@mui/material';

import { Logo, StyledBox, StyledForm } from '../Login.styled';
import { useSignIn } from '../useMakeInput';

export function SignIn() {
  const { inputs } = useSignIn();

  return (
    <StyledBox>
      <Logo />
      <StyledForm>
        <Typography>Welcome back to TLZ!</Typography>
        {inputs.map((input) => (
          <TextField key={input.id} label={input.label} type={input.type} fullWidth />
        ))}
        <Button variant="outlined">I am back!</Button>
      </StyledForm>
    </StyledBox>
  );
}
