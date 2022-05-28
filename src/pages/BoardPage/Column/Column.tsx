import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ControlPoint } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteColumn, updateColumn } from 'store/reducers/boards/boardsSlice';
import { BoardColumnsType } from 'store/reducers/boards/types';
import { AddPanel, StyledCloseIcon, StyledColumn, Title } from './Column.styled';
import { ModalAddTask } from './ModalAddTask/ModalAddTask';
import { Task } from './Task/Task';
import { EditingTitle } from 'components/EditingTitle/EditingTitle';

type ColumnProps = BoardColumnsType & { provided: any };

export const Column = ({ tasks, title, provided, id, order }: ColumnProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const boardId = useAppSelector((state) => state.boardsReducer.currentBoard?.id);

  const [openModal, setOpenModal] = useState(false);

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
        <StyledCloseIcon onClick={onDeleteColumn} style={{ cursor: 'pointer' }} />
      </Title>
      <Task tasks={tasks} columnId={id} />
      <AddPanel onClick={handlerClick}>
        <ControlPoint />
        {t('Add new task')}
      </AddPanel>
      <ModalAddTask openModal={openModal} setOpenModal={setOpenModal} columnId={id} />
    </StyledColumn>
  );
};
