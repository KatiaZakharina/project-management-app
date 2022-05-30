import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import { DivTaskItem, StyledAvatar, StyledControlBox, WrapperTask } from './TaskItem.styled';
import { BoardTasksType } from 'store/reducers/boards/types';
import { useAppSelector } from 'store/hooks';
import { stringAvatar } from './helpers/stringAvatar';
import { DraggableProvided } from 'react-beautiful-dnd';

interface ITaskItem {
  task: BoardTasksType;
  setCurrentTaskId: (id: string) => void;
  setOpenModalTransform: (id: boolean) => void;
  setOpenConfirmationModal: (id: boolean) => void;
}

type ColumnProps = ITaskItem & { provided: DraggableProvided };

export const TaskItem = ({
  task,
  setCurrentTaskId,
  setOpenModalTransform,
  setOpenConfirmationModal,
  provided,
}: ColumnProps) => {
  const { users } = useAppSelector((store) => store.userReducer);
  const currentUserAvatar = users.find((user) => user.id === task.userId)?.name as string;

  return (
    <DivTaskItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
      {currentUserAvatar && <StyledAvatar {...stringAvatar(currentUserAvatar)}></StyledAvatar>}
    </DivTaskItem>
  );
};
