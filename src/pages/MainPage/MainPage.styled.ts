import { Stack } from '@mui/material';
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
`;

export const WrapperBoardDiv = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  justify-content: space-between;
  max-width: 1400px;
  padding: 10px 20px;
  background-color: ${rgba(TURQUOISE, 0.4)};
  box-shadow: 3px 3px 3px ${rgba(VIOLET, 0.4)};
  border-radius: 10px;
`;
