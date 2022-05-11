import styled from 'styled-components';

import { VIOLET, PURPLE } from 'styles/constants';
import logo from 'assets/svg/logo.svg';

export const WrapperHeader = styled.header`
  width: 100%;
  height: 110px;
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
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  width: 120px;
  height: 85px;
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;
