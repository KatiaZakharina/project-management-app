import { Typography } from '@mui/material';
import styled from 'styled-components';

import { VIOLET, PURPLE } from 'styles/constants';
import backgroundImage from 'assets/png/background.png';
import logo from 'assets/svg/logo.svg';
import { rgba } from 'styles/helpers/rgba';

export const StyledDiv = styled.div`
  width: 100vw;
  max-height: calc(100vh - 60px);
  overflow-y: auto;
  padding: 20px;
  padding-bottom: 40px;
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right bottom;
`;

export const ContainerWelcomePage = styled.div`
  max-width: 1440px;
  min-height: calc(100vh - 200px);
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
  display: flex;
  height: 50px;
  gap: 10px;
`;

export const ContainerAboutUs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WrapperDevelopers = styled.div`
  display: flex;
  margin: 0 auto;
  width: 80%;
  gap: 3%;
  @media (max-width: 1024px) {
    width: 100%;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
`;

export const LinkDeveloper = styled.a`
  display: flex;
  background-color: ${rgba(VIOLET, 0.3)};
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  padding: 20px;
  border: 2px solid ${VIOLET};
  border-radius: 10px;
  @media (max-width: 500px) {
    flex-direction: row;
    align-items: flex-start;
    width: 90%;
  }
`;

export const StyledPhoto = styled.img`
  width: 70%;
  border-radius: 50%;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 500px) {
    width: 40%;
  }
`;

export const StyledTypography = styled(Typography)`
  &.MuiTypography-h1 {
    color: ${PURPLE};
    font-weight: 400;
    margin-bottom: 30px;
    @media (max-width: 1024px) {
      font-size: 60px;
    }
  }
  &.MuiTypography-h4 {
    font-weight: 500;
    color: ${PURPLE};
    margin-bottom: 20px;
    text-align: center;
    @media (max-width: 1024px) {
      font-size: 20px;
    }
    @media (max-width: 768px) {
      font-size: 18px;
    }
  }
  &.MuiTypography-h6 {
    color: ${PURPLE};
    font-weight: 400;
    text-align: center;
    @media (max-width: 1024px) {
      font-size: 16px;
    }
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

export const DivTypography = styled.div`
  display: flex;
  flex-direction: column;
`;
