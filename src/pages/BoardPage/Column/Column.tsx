import { ControlPoint } from '@mui/icons-material';
import { EditingTitle } from 'components/EditingTitle/EditingTitle';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteColumn, updateColumn } from 'store/reducers/boards/boardsSlice';
import { BoardColumnsType } from 'store/reducers/boards/types';
import {
  AddPanel,
  FakeTask,
  StyledCloseIcon,
  StyledColumn,
  TaskList,
  TaskListWrapper,
  Title,
} from './Column.styled';

type ColumnProps = BoardColumnsType & { provided: any };

export const Column = ({ tasks, title, provided, id, order }: ColumnProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const boardId = useAppSelector((state) => state.boardsReducer.currentBoard?.id);

  const onDeleteColumn = () => {
    if (!boardId) {
      navigate('/');
    } else {
      dispatch(deleteColumn({ boardId, columnId: id }));
    }
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

      <TaskListWrapper>
        <TaskList>
          {tasks?.map((task) => (
            <FakeTask key={task.id}>{JSON.stringify(task.description)}</FakeTask>
          ))}
        </TaskList>
      </TaskListWrapper>

      <AddPanel>
        <ControlPoint />
        {t('Add new task')}
      </AddPanel>
    </StyledColumn>
  );
};
