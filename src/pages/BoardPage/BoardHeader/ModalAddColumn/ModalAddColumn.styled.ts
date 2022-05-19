import styled from 'styled-components';
import { Box, Modal } from '@mui/material';

import { WHITE, AZURE_BLUE, RED } from 'styles/constants';
import { rgba } from 'styles/helpers/rgba';

export const StyledModal = styled(Modal)`
  &.MuiModal-root {
    background-color: ${rgba(AZURE_BLUE, 0.4)};
  }
`;

export const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: ${WHITE};
  border-radius: 10px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0px 0px 19px 2px ${rgba(AZURE_BLUE, 0.4)};
  border-radius: 10px;
  padding: 20px 40px;
  max-width: 400px;
  width: 100%;
  gap: 30px;
`;

export const WrapperError = styled.div`
  height: 10px;
`;

export const StyledError = styled.p`
  color: ${RED};
  margin: 5px 0 0 0;
`;
