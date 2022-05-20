import { Typography } from '@mui/material';
import styled from 'styled-components';

export const StyledTypography = styled(Typography)`
  &.MuiTypography-h5 {
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  align-items: center;
`;
