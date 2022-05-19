import { Typography } from '@mui/material';
import styled from 'styled-components';

export const WrapperBoardFunctional = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto;
`;

export const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

export const StyledTypography = styled(Typography)`
  &.MuiTypography-h5 {
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
