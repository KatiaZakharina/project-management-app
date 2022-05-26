import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';

import { AZURE_BLUE, GRAY, LIGHT_GRAY } from 'styles/constants';
import { rgba } from 'styles/helpers/rgba';

export const StyledColumn = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 50px 1fr;
  min-width: 250px;
  margin: 0 15px 10px 15px;
  background-color: ${LIGHT_GRAY};
  border-radius: 5px;
`;

export const Title = styled.div`
  display: flex;
  min-height: 60px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${GRAY};
  padding: 10px;
`;

export const TaskListWrapper = styled.div`
  height: calc(100vh - 350px);
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
  align-items: center;
  gap: 5px;
  padding: 10px;
  cursor: pointer;
`;

export const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
`;

export const FakeTask = styled.div`
  min-width: 20px;
  margin-bottom: 15px;
  padding: 10px;
  background-color: ${rgba(AZURE_BLUE, 0.3)};
`;
