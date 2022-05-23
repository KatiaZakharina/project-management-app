import styled from 'styled-components';

import { AZURE_BLUE } from 'styles/constants';
import { rgba } from 'styles/helpers/rgba';

export const TaskListWrapper = styled.div`
  height: calc(100vh - 350px);
  overflow-y: auto;
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow-y: auto;
  gap: 15px;
`;

export const TaskItem = styled.div`
  background-color: ${rgba(AZURE_BLUE, 0.3)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 5px;
  gap: 10px;
`;

export const StyledControlBox = styled.div`
  display: flex;
  max-width: 50px;
  gap: 5px;
`;
