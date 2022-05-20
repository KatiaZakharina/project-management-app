import { ControlPoint } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

import { BoardColumnsType } from 'store/reducers/boards/types';
import {
  AddPanel,
  FakeTask,
  StyledColumn,
  TaskList,
  TaskListWrapper,
  Title,
} from './Column.styled';
import { ModalAddTask } from './ModalAddTask/ModalAddTask';

export const Column = ({ tasks, title }: BoardColumnsType) => {
  const [openModal, setOpenModal] = useState(false);

  function handlerClick() {
    setOpenModal(true);
  }

  return (
    <StyledColumn>
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

      <AddPanel onClick={handlerClick}>
        <ControlPoint />
      </AddPanel>
      <ModalAddTask openModal={openModal} setOpenModal={setOpenModal} />
    </StyledColumn>
  );
};
