import { Avatar } from '@mui/material';
import styled from 'styled-components';

import { AZURE_BLUE } from 'styles/constants';
import { rgba } from 'styles/helpers/rgba';

export const DivTaskItem = styled.div`
  background-color: ${rgba(AZURE_BLUE, 0.3)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 5px;
`;

export const StyledControlBox = styled.div`
  display: flex;
  max-width: 50px;
  gap: 5px;
`;

export const WrapperTask = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 5px;
  gap: 10px;
`;

export const StyledAvatar = styled(Avatar)`
  margin-left: auto;
`;
