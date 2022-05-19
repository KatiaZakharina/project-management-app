import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Header } from 'components/Header/Header';
import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import {
  WrapperBoardFunctional,
  StyledDiv,
  StyledTypography,
  ColumnList,
  ColumnListWrapper,
} from './BoardPage.styled';
import { deleteBoard, fetchBoardData } from 'store/reducers/boards/boardsSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { Column } from './Column/Column';

export const BoardPage = () => {
  const { boardID } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
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

  const onConfirm = async () => {
    if (boardID) {
      await dispatch(deleteBoard(boardID));
    }
    navigate('/');
  };

  const onCancel = () => {
    closeModal();
  };

  const closeModal = () => {
    setOpenConfirmationModal(false);
  };

  const { t } = useTranslation();

  return (
    <>
      <Header></Header>
      <WrapperBoardFunctional>
        <StyledDiv>
          <StyledTypography variant="h5">{currentBoard?.title}</StyledTypography>
          <Button variant="outlined" color="primary" startIcon={<AddCircleIcon />}>
            {t('Add new list')}
          </Button>
        </StyledDiv>
        <Button
          data-tag="delete-button"
          variant="contained"
          color="warning"
          startIcon={<DeleteIcon />}
          onClick={() => {
            setOpenConfirmationModal(true);
          }}
        >
          {t('Delete board')}
        </Button>
      </WrapperBoardFunctional>
      <ConfirmationModal
        openConfirmationModal={openConfirmationModal}
        onCancel={onCancel}
        onConfirm={onConfirm}
      ></ConfirmationModal>
      <ColumnListWrapper>
        <ColumnList>
          {currentBoard ? (
            currentBoard.columns ? (
              currentBoard.columns.map((column) => <Column {...column} key={column.id} />)
            ) : (
              <p>{t('Create new board')}</p>
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
