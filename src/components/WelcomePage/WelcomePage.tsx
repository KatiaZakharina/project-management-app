import React from 'react';
import {
  StyledDiv,
  StyledTitle,
  StyledText,
  WrapperWelcomeText,
  WrapperDivButtons,
  ButtonLogIn,
  ButtonSignUp,
  Logo,
} from './WelcomePage.styled';

export const WelcomePage = () => {
  return (
    <StyledDiv>
      <WrapperWelcomeText>
        <Logo />
        <StyledTitle>Welcome</StyledTitle>
        <StyledText>to TLZ project management app</StyledText>
      </WrapperWelcomeText>
      <WrapperDivButtons>
        <ButtonLogIn variant="outlined">Log In</ButtonLogIn>
        <ButtonSignUp variant="contained">Sign Up</ButtonSignUp>
      </WrapperDivButtons>
    </StyledDiv>
  );
};
