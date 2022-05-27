import { useState } from 'react';
import { ControlPoint } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteColumn, updateColumn } from 'store/reducers/boards/boardsSlice';
import { BoardColumnsType } from 'store/reducers/boards/types';
import { AddPanel, StyledCloseIcon, StyledColumn, Title } from './Column.styled';
import { ModalAddTask } from './ModalAddTask/ModalAddTask';
import { Task } from './Task/Task';
import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { EditingTitle } from 'components/EditingTitle/EditingTitle';

type ColumnProps = BoardColumnsType & { provided: any };

export const Column = ({ tasks, title, provided, id, order }: ColumnProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const boardId = useAppSelector((state) => state.boardsReducer.currentBoard?.id);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const onDeleteColumn = () => {
    if (!boardId) {
      navigate('/');
    } else {
      dispatch(deleteColumn({ boardId, columnId: id }));
    }
  };

  const onCancel = () => {
    closeModal();
  };

  const closeModal = () => {
    setOpenConfirmationModal(false);
  };

  const handlerClick = () => {
    setOpenModal(true);
  };

  const updateColumnTitle = async (data: { title: string }) => {
    const newColumnData = {
      title: data.title,
      order: order,
    };
    if (boardId) {
      await dispatch(updateColumn({ boardId, columnId: id, columnData: newColumnData }));
    }
  };
  const { t } = useTranslation();

  return (
    <StyledColumn
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Title>
        <EditingTitle title={title} onTitleSubmit={updateColumnTitle} styles="h6" />
        <StyledCloseIcon
          onClick={() => setOpenConfirmationModal(true)}
          style={{ cursor: 'pointer' }}
        />
      </Title>
      <Task tasks={tasks} columnId={id} />
      <AddPanel onClick={handlerClick}>
        <ControlPoint />
        {t('Add new task')}
      </AddPanel>

      <ConfirmationModal
        openConfirmationModal={openConfirmationModal}
        onCancel={onCancel}
        onConfirm={onDeleteColumn}
      ></ConfirmationModal>
      <ModalAddTask openModal={openModal} setOpenModal={setOpenModal} columnId={id} />
    </StyledColumn>
  );
};
