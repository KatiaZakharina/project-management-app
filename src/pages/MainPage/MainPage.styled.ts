import { Stack, Typography, Accordion } from '@mui/material';
import styled from 'styled-components';

import { TURQUOISE, VIOLET } from 'styles/constants';
import { rgba } from 'styles/helpers/rgba';

export const WrapperDivMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 20px;
  min-height: calc(100vh - 60px - 80px);
`;

export const StyledStack = styled(Stack)`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  padding: 20px 60px;
  align-items: center;
  @media screen and (max-width: 620px) {
    padding: 20px 0;
  }
`;

export const WrapperButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const StyledTypography = styled(Typography)`
  &.MuiTypography-h5 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media screen and (max-width: 420px) {
      font-size: 18px;
    }
  }
  &.MuiTypography-subtitle1 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 5px 0;
  }
`;

export const StyledAccordion = styled(Accordion)`
  width: 100%;
  max-width: 1400px;
  &.MuiAccordion-root {
    background-color: ${rgba(TURQUOISE, 0.4)};
    box-shadow: 3px 3px 3px ${rgba(VIOLET, 0.4)};
    border-radius: 10px;
  }
  &:hover {
    background-color: ${rgba(TURQUOISE, 0.6)};
  }
`;

export const EmptyBoards = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;
