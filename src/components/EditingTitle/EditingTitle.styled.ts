import { IconButton, TextField, Typography } from '@mui/material';
import styled from 'styled-components';

export const StyledTypography = styled(Typography)`
  &.MuiTypography-h5 {
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media screen and (max-width: 550px) {
      max-width: 130px;
    }
  }
  &.MuiTypography-h6 {
    font-weight: 400;
    font-size: 1rem;
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

export const StyledTextField = styled(TextField)`
  & input {
    padding: 10px 15px;
  }
`;

export const StyledIconButton = styled(IconButton)`
  &.MuiIconButton-colorPrimary {
    @media screen and (max-width: 800px) {
      padding: 2px;
    }
  }
`;
