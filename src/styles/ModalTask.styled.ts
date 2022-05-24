import { Modal } from '@mui/material';
import styled from 'styled-components';

import { AZURE_BLUE, WHITE } from 'styles/constants';
import { rgba } from 'styles/helpers/rgba';

export const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${rgba(AZURE_BLUE, 0.4)};
`;

export const ModalContext = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${WHITE};
  padding: 20px 40px;
  gap: 15px;
  max-width: 400px;
  width: 100%;
`;
