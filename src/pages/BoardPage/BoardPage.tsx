import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { Header } from 'components/Header/Header';
import { ColumnList, ColumnListWrapper } from './BoardPage.styled';
import { fetchBoardData } from 'store/reducers/boards/boardsSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { Column } from './Column/Column';
import { BoardHeader } from './BoardHeader/BoardHeader';

export const BoardPage = () => {
  const { boardID } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentBoard } = useAppSelector((state) => state.boardsReducer);

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

  return (
    <>
      <Header></Header>
      <BoardHeader />
      <ColumnListWrapper>
        <ColumnList>
          {currentBoard ? (
            currentBoard.columns ? (
              currentBoard.columns.map((column) => <Column {...column} key={column.id} />)
            ) : (
              <p>Create new board</p>
            )
          ) : (
            <CircularProgress
              color="secondary"
              style={{ margin: 'auto' }}
              size={80}
              thickness={4}
            />
          )}
        </ColumnList>
      </ColumnListWrapper>
    </>
  );
};
