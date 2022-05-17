import { Stack, Typography } from '@mui/material';
import styled from 'styled-components';
import { TURQUOISE, VIOLET } from 'styles/constants';
import { rgba } from 'styles/helpers/rgba';

export const WrapperDivMain = styled.div`
  width: 100%;
  padding: 10px 20px;
`;

export const StyledStack = styled(Stack)`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  padding: 20px 40px;
  align-items: center;
  @media screen and (max-width: 420px) {
    padding: 20px 0;
  }
`;

export const WrapperBoardDiv = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  min-height: 73px;
  gap: 10px;
  justify-content: space-between;
  max-width: 1400px;
  padding: 10px 20px;
  background-color: ${rgba(TURQUOISE, 0.4)};
  box-shadow: 3px 3px 3px ${rgba(VIOLET, 0.4)};
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${rgba(TURQUOISE, 0.6)};
  }
`;

export const WrapperDescriptionRepo = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
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
  }
`;
