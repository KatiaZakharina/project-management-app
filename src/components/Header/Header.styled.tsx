import styled from 'styled-components';
import { Button } from '@mui/material';

import { VIOLET, PURPLE, AZURE_BLUE } from 'styles/constants';
import logo from 'assets/svg/logo.svg';

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
    height: 90px;
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
  & > button {
    margin: 0 10px;
  }
`;

export const StyledButton = styled(Button)`
  &.MuiButton-containedPrimary {
    box-shadow: 3px 3px 5px ${AZURE_BLUE};
    border: 2px solid ${AZURE_BLUE};
  }
`;
