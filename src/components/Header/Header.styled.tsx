import styled from 'styled-components';
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';

import { VIOLET, PURPLE, AZURE_BLUE } from 'styles/constants';
import logo from 'assets/svg/logo.svg';
import { rgba } from 'styles/helpers/rgba';

export const WrapperHeader = styled.header`
  width: 100%;
  height: 80px;
  position: sticky;
  top: 0;
  background-color: ${VIOLET};
  transition: all 0.5s ease-out;
  z-index: 100;
  &.active {
    background-color: ${PURPLE};
    height: 65px;
  }
`;

export const ContentHeader = styled.div`
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 5px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  width: 110px;
  height: 75px;
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

export const WrapperButtons = styled.div`
  display: flex;
  @media screen and (max-width: 880px) {
    display: none;
  }
  & > button {
    margin: 0 10px;
  }
  &.active {
    @media screen and (max-width: 880px) {
      display: block;
      display: flex;
      gap: 10px;
      height: 100vh;
      width: 291px;
      flex-direction: column;
      background-color: ${VIOLET};
      position: absolute;
      right: 0;
      top: 0;
      padding: 20px;
      z-index: 100;
      align-items: flex-start;
    }
  }
`;

export const StyledButton = styled(Button)`
  &.MuiButton-containedPrimary {
    box-shadow: 3px 3px 5px ${AZURE_BLUE};
    border: 2px solid ${AZURE_BLUE};
    @media screen and (max-width: 880px) {
      box-shadow: none;
      border: none;
    }
  }
`;

export const StyledIconButton = styled(IconButton)`
  &.MuiIconButton-colorSecondary {
    display: none;
    @media screen and (max-width: 880px) {
      display: block;
      &.active {
        display: none;
      }
    }
  }
`;

export const LayoutBurger = styled.div`
  &.active {
    position: absolute;
    height: 100vh;
    width: calc(100vw - 290px);
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: ${rgba(VIOLET, 0.4)};
  }
`;
