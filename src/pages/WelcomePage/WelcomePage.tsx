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
  ButtonMainPage,
} from './WelcomePage.styled';
import { getLoginToken } from 'helpers/getLoginToken';

export const WelcomePage = () => {
  const navigate = useNavigate();

  const loginToken = getLoginToken();

  const moveTo = (link: string) => {
    navigate(`/${link}`);
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
            <ButtonMainPage variant="contained" onClick={() => moveTo('/')}>
              Go to Main Page
            </ButtonMainPage>
          ) : (
            <>
              <ButtonLogIn variant="outlined" onClick={() => moveTo('signin')}>
                Log In
              </ButtonLogIn>
              <ButtonSignUp variant="contained" onClick={() => moveTo('signup')}>
                Sign Up
              </ButtonSignUp>
            </>
          )}
        </WrapperDivButtons>
      </ContainerWelcomePage>
    </StyledDiv>
  );
};
