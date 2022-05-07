import { Button, ButtonGroup } from '@mui/material';
import React from 'react';
import {
  StyledDiv,
  StyledTitle,
  StyledText,
  WrapperWelcomeText,
  WrapperDivButtons,
  ButtonLogIn,
  ButtonSignUp,
} from './WelcomePage.styled';

export const WelcomePage = () => {
  return (
    <StyledDiv>
      <WrapperWelcomeText>
        <StyledTitle>Welcome</StyledTitle>
        <StyledText>to TLZ project management app</StyledText>
      </WrapperWelcomeText>
      {/* <ButtonGroup> */}
      {/* <ButtonLogIn variant="outlined">One</ButtonLogIn>
      <Button variant="contained">Two</Button> */}
      {/* </ButtonGroup> */}
      <WrapperDivButtons>
        <ButtonLogIn variant="outlined">Log In</ButtonLogIn>
        <ButtonSignUp variant="contained">Sign Up</ButtonSignUp>
      </WrapperDivButtons>
    </StyledDiv>
  );
};
