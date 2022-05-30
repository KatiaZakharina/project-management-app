import styled from 'styled-components';

export const TaskListWrapper = styled.div`
  height: calc(100vh - 350px);
  overflow-y: auto;
  margin: 10px 0 0 0;
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow-y: auto;
  gap: 10px;
`;
