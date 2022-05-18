import styled from 'styled-components';

import { PURPLE, WHITE } from 'styles/constants';
import logoRSS from 'assets/svg/rs_school_js.svg';

export const WrapperFooter = styled.footer`
  height: 60px;
  background-color: ${PURPLE};
  position: fixed;
  bottom: 0;
  width: 100%;
`;

export const ContentFooter = styled.div`
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 5px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoRSS = styled.a`
  width: 100px;
  height: 40px;
  background-image: url(${logoRSS});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  @media (max-width: 720px) {
    width: 70px;
  }
`;

export const TeamMates = styled.div`
  display: flex;
  & > a {
    text-decoration: none;
    color: ${WHITE};
    margin: 0 15px;
    font-size: 18px;
  }
  @media (max-width: 720px) {
    display: none;
  }
`;

export const Year = styled.p`
  color: ${WHITE};
  font-size: 18px;
`;
