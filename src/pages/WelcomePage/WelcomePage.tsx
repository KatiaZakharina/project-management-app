import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  StyledDiv,
  StyledTitle,
  StyledText,
  WrapperWelcomeText,
  WrapperDivButtons,
  ButtonLogIn,
  ButtonSignUp,
  Logo,
  ContainerWelcomePage,
} from './WelcomePage.styled';
import { getLoginToken } from 'helpers/getLoginToken';
import { Button } from '@mui/material';

export const WelcomePage = () => {
  const navigate = useNavigate();

  const loginToken = getLoginToken();

  const moveTo = (link: string) => {
    navigate(`${link}`);
  };

  return (
    <StyledDiv>
      <ContainerWelcomePage>
        <WrapperWelcomeText>
          <Logo />
          <StyledTitle>Welcome</StyledTitle>
          <StyledText>to TLZ project management app</StyledText>
        </WrapperWelcomeText>
        <WrapperDivButtons>
          {loginToken ? (
            <Button variant="contained" onClick={() => moveTo('/')}>
              Go to Main Page
            </Button>
          ) : (
            <>
              <ButtonLogIn variant="outlined" onClick={() => moveTo('/signin')}>
                Sign In
              </ButtonLogIn>
              <ButtonSignUp variant="contained" onClick={() => moveTo('/signup')}>
                Sign Up
              </ButtonSignUp>
            </>
          )}
        </WrapperDivButtons>
      </ContainerWelcomePage>
    </StyledDiv>
  );
};
