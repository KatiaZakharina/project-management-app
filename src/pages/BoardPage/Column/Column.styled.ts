import styled from 'styled-components';

import { GRAY, LIGHT_GRAY, WHITE } from 'styles/constants';

export const StyledColumn = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 50px 1fr;
  min-width: 250px;
  margin-bottom: 10px;
  background-color: ${LIGHT_GRAY};
  border-radius: 5px;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${GRAY};
  padding: 10px;
`;

export const TaskListWrapper = styled.div`
  height: calc(100vh - 320px);
  overflow-y: auto;
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow-y: auto;
`;

export const AddPanel = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
`;

export const FakeTask = styled.div`
  min-width: 20px;
  margin-bottom: 15px;
  padding: 10px;
  background-color: ${WHITE};
`;
