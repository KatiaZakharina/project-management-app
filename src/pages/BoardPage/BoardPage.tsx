import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { Header } from 'components/Header/Header';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { ColumnList, ColumnListWrapper } from './BoardPage.styled';
import { Column } from './Column/Column';
import { fetchBoardData } from 'store/reducers/boards/boardsSlice';

export const BoardPage = () => {
  const { boardID } = useParams();
  const { currentBoard } = useAppSelector((state) => state.boardsReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!boardID) {
      navigate('/');
    } else {
      dispatch(fetchBoardData(boardID));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
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
