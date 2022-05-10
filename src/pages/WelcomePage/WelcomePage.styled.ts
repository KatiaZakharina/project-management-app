import styled from 'styled-components';
import { Button } from '@mui/material';

import { VIOLET } from 'styles/constants';

import backgroundImage from '../../assets/png/background.png';
import logo from '../../assets/svg/logo.svg';

export const StyledDiv = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right bottom;
`;

export const ContainerWelcomePage = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  @media (max-width: 680px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Logo = styled.div`
  width: 280px;
  height: 188px;
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  @media (max-width: 680px) {
    width: 200px;
  }
`;

export const WrapperWelcomeText = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  @media (max-width: 680px) {
    align-items: center;
  }
`;

export const StyledTitle = styled.h1`
  margin: 0;
  font-size: 100px;
  color: ${VIOLET};
  text-transform: uppercase;
  @media (max-width: 1024px) {
    font-size: 70px;
  }
  @media (max-width: 460px) {
    font-size: 50px;
  }
`;

export const StyledText = styled.p`
  margin: 10px;
  font-size: 35px;
  color: ${VIOLET};
  @media (max-width: 1024px) {
    font-size: 25px;
  }
  @media (max-width: 460px) {
    font-size: 15px;
  }
`;

export const WrapperDivButtons = styled.div`
  padding: 10px;
`;

export const ButtonLogIn = styled(Button)`
  &.MuiButton-outlined {
    width: 85px;
    margin-right: 10px;
  }
`;

export const ButtonSignUp = styled(Button)`
  &.MuiButton-contained {
    width: 85px;
  }
`;
