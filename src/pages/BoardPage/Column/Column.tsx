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

type ColumnProps = BoardColumnsType & { provided: any };

export const Column = ({ tasks, title, provided }: ColumnProps) => {
  return (
    <StyledColumn
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Title>
        <h4>{title}</h4>
        <CloseIcon />
      </Title>

      <TaskListWrapper>
        <TaskList>
          {tasks?.map((task) => (
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
