import { Button } from '@mui/material';
import styled from 'styled-components';

import { PURPLE } from 'styles/constants';

export const WrapperBoardFunctional = styled.div`
  width: 100%;
  max-width: 1440px;
  min-height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
  padding: 0 20px;
`;

export const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

export const ButtonGoBack = styled(Button)`
  &.MuiButton-contained {
    background-color: ${PURPLE};
    display: flex;
    align-items: center;
  }
`;
