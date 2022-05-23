import { ControlPoint } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteColumn, deleteTask } from 'store/reducers/boards/boardsSlice';
import { BoardColumnsType } from 'store/reducers/boards/types';
import {
  AddPanel,
  StyledCloseIcon,
  StyledColumn,
  TaskList,
  TaskListWrapper,
  Title,
  TaskItem,
  StyledControlBox,
} from './Column.styled';
import { ModalAddTask } from './ModalAddTask/ModalAddTask';
import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';

type ColumnProps = BoardColumnsType & { provided: any };

export const Column = ({ tasks, title, provided, id }: ColumnProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const boardId = useAppSelector((state) => state.boardsReducer.currentBoard?.id);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState('');

  const onDeleteColumn = () => {
    if (!boardId) {
      navigate('/');
    } else {
      dispatch(deleteColumn({ boardId, columnId: id }));
    }
  };

  const handlerClick = () => {
    setOpenModal(true);
  };

  const onCancel = () => {
    setOpenConfirmationModal(false);
  };

  const onConfirm = async () => {
    if (boardId) {
      await dispatch(deleteTask({ boardId, columnId: id, taskId: currentTaskId }));
    }
    setOpenConfirmationModal(false);
  };

  return (
    <StyledColumn
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Title>
        <h4>{title}</h4>
        <StyledCloseIcon onClick={onDeleteColumn} style={{ cursor: 'pointer' }} />
      </Title>
      <TaskListWrapper>
        <TaskList>
          {tasks?.map((task) => (
            <TaskItem key={task.id}>
              <Typography>{task.description}</Typography>
              <StyledControlBox>
                <EditIcon onClick={() => {}} style={{ cursor: 'pointer' }} />
                <StyledCloseIcon
                  onClick={() => {
                    setCurrentTaskId(task.id);
                    setOpenConfirmationModal(true);
                  }}
                  style={{ cursor: 'pointer' }}
                />
                {openConfirmationModal && (
                  <ConfirmationModal
                    openConfirmationModal={openConfirmationModal}
                    onCancel={onCancel}
                    onConfirm={onConfirm}
                  ></ConfirmationModal>
                )}
              </StyledControlBox>
            </TaskItem>
          ))}
        </TaskList>
      </TaskListWrapper>
      <AddPanel onClick={handlerClick}>
        <ControlPoint />
        Add new task
      </AddPanel>
      <ModalAddTask openModal={openModal} setOpenModal={setOpenModal} columnId={id} />
    </StyledColumn>
  );
};
