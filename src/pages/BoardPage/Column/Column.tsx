import { ControlPoint } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

import { BoardColumnsType } from 'store/reducers/boards/types';
import {
  AddPanel,
  FakeTask,
  StyledColumn,
  TaskList,
  TaskListWrapper,
  Title,
} from './Column.styled';

export const Column = ({ tasks, title }: BoardColumnsType) => {
  return (
    <StyledColumn>
      <Title>
        <h4>{title}</h4>
        <CloseIcon />
      </Title>

      <TaskListWrapper>
        <TaskList>
          {tasks.map((task) => (
            <FakeTask key={task.id}>{JSON.stringify(task.description)}</FakeTask>
          ))}
        </TaskList>
      </TaskListWrapper>

      <AddPanel>
        <ControlPoint />
        Add new task
      </AddPanel>
    </StyledColumn>
  );
};
