import styled from 'styled-components';
import { Button } from '@mui/material';

import { VIOLET } from 'styles/constants';

import backgroundImage from '../../assets/png/background.png';

export const StyledDiv = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right;
`;

export const WrapperWelcomeText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 50px;
`;

export const StyledTitle = styled.h1`
  margin: 0;
  margin-top: 150px;
  font-size: 100px;
  color: ${VIOLET};
  text-transform: uppercase;
`;

export const StyledText = styled.p`
  margin: 0;
  font-size: 35px;
  color: ${VIOLET};
`;

export const WrapperDivButtons = styled.div`
  margin-right: 50px;
`;

export const ButtonLogIn = styled(Button)`
  &.MuiButton-outlined {
    margin: 20px;
  }
`;

export const ButtonSignUp = styled(Button)`
  margin-top: 20px;
`;
