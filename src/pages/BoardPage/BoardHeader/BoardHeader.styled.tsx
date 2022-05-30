import { Button } from '@mui/material';
import styled from 'styled-components';

export const WrapperBoardFunctional = styled.div`
  width: 100%;
  max-width: 1440px;
  min-height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
  padding: 0 20px;
  @media screen and (max-width: 600px) {
    padding: 0 10px;
    gap: 5px;
  }
`;

export const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  @media screen and (max-width: 800px) {
    gap: 2px;
  }
`;

export const StyledButton = styled(Button)`
  &.MuiButton-contained,
  &.MuiButton‑outlined {
    display: flex;
    align-items: center;
  }
`;

export const StyledSpan = styled.span`
  padding-left: 5px;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;
