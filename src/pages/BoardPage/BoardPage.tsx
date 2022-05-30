import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

import { Header } from 'components/Header/Header';
import { ColumnList, ColumnListWrapper } from './BoardPage.styled';
import { fetchBoardData, updateColumn, updateColumns } from 'store/reducers/boards/boardsSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { Column } from './Column/Column';
import { BoardHeader } from './BoardHeader/BoardHeader';
import { BoardColumnsType } from 'store/reducers/boards/types';
import { getAllUsers } from 'store/reducers/user/userSlice';
import { FetchingWrapper } from 'components/helpers/FetchingWrapper/FetchingWrapper';

export const BoardPage = () => {
  const { boardID } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentBoard, errorMessage } = useAppSelector((state) => state.boardsReducer);
  const [columns, setColumns] = useState<BoardColumnsType[]>(currentBoard?.columns || []);

  useEffect(() => {
    if (!boardID) {
      navigate('/');
    } else {
      dispatch(fetchBoardData(boardID));
      dispatch(getAllUsers());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setColumns(currentBoard?.columns || []);
  }, [currentBoard]);

  const reorder = (list: BoardColumnsType[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    dispatch(
      updateColumn({
        boardId: boardID!,
        columnId: removed.id,
        columnData: { title: removed.title, order: endIndex + 1 },
      })
    );

    return result
      .map((column, index) => ({
        id: column.id,
        title: column.title,
        order: index + 1,
      }))
      .sort((a, b) => a.order - b.order);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newColumns = reorder(columns, result.source.index, result.destination.index);
    dispatch(updateColumns(newColumns));
  };

  const { t } = useTranslation();

  return (
    <>
      <Header />

      <BoardHeader />

      <FetchingWrapper isLoading={!currentBoard} errorMessage={errorMessage}>
        {columns ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <ColumnListWrapper>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided) => (
                  <ColumnList ref={provided.innerRef} {...provided.droppableProps}>
                    {columns
                      .slice()
                      .sort((a, b) => a.order - b.order)
                      .map((column, index) => (
                        <Draggable key={column.id} draggableId={column.id} index={index}>
                          {(provided) => <Column {...column} key={column.id} provided={provided} />}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </ColumnList>
                )}
              </Droppable>
            </ColumnListWrapper>
          </DragDropContext>
        ) : (
          <p>{t('Create new board')}</p>
        )}
      </FetchingWrapper>
    </>
  );
};
