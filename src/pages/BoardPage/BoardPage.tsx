import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { Header } from 'components/Header/Header';
import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { Button } from '@mui/material';
import { WrapperBoardFunctional, StyledDiv, StyledTypography } from './BoardPage.styled';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteBoard, getBoardByID } from 'store/reducers/boards/boardsSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';

export const BoardPage = () => {
  const { boardID } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const { currentBoard } = useAppSelector((state) => state.boardsReducer);

  useEffect(() => {
    loadBoardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBoardData = async () => {
    if (boardID) {
      await dispatch(getBoardByID(boardID));
      console.log(currentBoard);
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

  return (
    <>
      <Header></Header>
      <WrapperBoardFunctional>
        <StyledDiv>
          <StyledTypography variant="h5">{currentBoard?.title}</StyledTypography>
          <Button variant="outlined" color="primary" startIcon={<AddCircleIcon />}>
            Add new list
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
          Delete
        </Button>
      </WrapperBoardFunctional>
      <ConfirmationModal
        openConfirmationModal={openConfirmationModal}
        onCancel={onCancel}
        onConfirm={onConfirm}
      ></ConfirmationModal>
    </>
  );
};
