import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import { DivTaskItem, StyledAvatar, StyledControlBox, WrapperTask } from './TaskItem.styled';
import { BoardTasksType } from 'store/reducers/boards/types';

interface ITaskItem {
  task: BoardTasksType;
  setCurrentTaskId: (id: string) => void;
  setOpenModalTransform: (id: boolean) => void;
  setOpenConfirmationModal: (id: boolean) => void;
}

export const TaskItem = ({
  task,
  setCurrentTaskId,
  setOpenModalTransform,
  setOpenConfirmationModal,
}: ITaskItem) => {
  return (
    <DivTaskItem key={task.id}>
      <WrapperTask>
        <Typography>{task.title}</Typography>
        <StyledControlBox>
          <EditIcon
            onClick={() => {
              setCurrentTaskId(task.id);
              setOpenModalTransform(true);
            }}
            style={{ cursor: 'pointer' }}
          />
          <CloseIcon
            onClick={() => {
              setCurrentTaskId(task.id);
              setOpenConfirmationModal(true);
            }}
            style={{ cursor: 'pointer' }}
          />
        </StyledControlBox>
      </WrapperTask>
      <StyledAvatar sx={{ width: 30, height: 30 }}> D </StyledAvatar>
    </DivTaskItem>
  );
};
