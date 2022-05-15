import styled from 'styled-components';
import { Box, Modal } from '@mui/material';

import { WHITE, AZURE_BLUE } from 'styles/constants';
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
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transform: translate(-50%, -50%);
  max-width: 400px;
  background-color: ${WHITE};
  border-radius: 10px;
`;

export const WrapperButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;
