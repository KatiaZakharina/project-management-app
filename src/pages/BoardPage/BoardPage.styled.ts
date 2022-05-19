import { Typography } from '@mui/material';
import styled from 'styled-components';

export const WrapperBoardFunctional = styled.div`
  width: 100%;
  max-width: 1440px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto;
  padding-left: 20px;
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

export const ColumnList = styled.div`
  display: flex;
  flex: 1 1 auto;
  gap: 20px;
  height: 100%;
  margin-left: 20px;
`;

export const ColumnListWrapper = styled.div`
  width: calc(100vw - 20px);
  max-width: 1440px;
  height: calc(100vh - 230px);
  margin: 0 auto;
  overflow-y: auto;
`;
