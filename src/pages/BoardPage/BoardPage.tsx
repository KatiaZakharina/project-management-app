import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { Header } from 'components/Header/Header';
import { ColumnList, ColumnListWrapper } from './BoardPage.styled';
import { fetchBoardData } from 'store/reducers/boards/boardsSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { Column } from './Column/Column';
import { BoardHeader } from './BoardHeader/BoardHeader';
import { BoardColumnsType } from 'store/reducers/boards/types';

export const BoardPage = () => {
  const { boardID } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentBoard } = useAppSelector((state) => state.boardsReducer);
  const [columns, setColumns] = useState<BoardColumnsType[]>(currentBoard?.columns || []);

  useEffect(() => {
    if (!boardID) {
      navigate('/');
    } else {
      loadBoardData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBoardData = async () => {
    if (boardID) {
      await dispatch(fetchBoardData(boardID));
    }
  };

  //dnd

  const reorder = (list: BoardColumnsType[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const newColumns = reorder(columns, result.source.index, result.destination.index);

    setColumns(newColumns);
  };

  return (
    <>
      <Header />

      <BoardHeader />

      {currentBoard ? (
        columns ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <ColumnListWrapper>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided) => (
                  <ColumnList ref={provided.innerRef} {...provided.droppableProps}>
                    {columns.map((column, index) => (
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
          <p>Create new board</p>
        )
      ) : (
        <CircularProgress color="secondary" style={{ margin: 'auto' }} size={80} thickness={4} />
      )}
    </>
  );
};
