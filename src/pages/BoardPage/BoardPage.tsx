import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { Header } from 'components/Header/Header';
import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { Button } from '@mui/material';
import { WrapperBoardFunctional } from './BoardPage.styled';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteBoard } from 'store/reducers/boards/boardsSlice';
import { useAppDispatch } from 'store/hooks';

export const BoardPage = () => {
  const { boardID } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

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
        <Button variant="outlined" color="primary" startIcon={<AddCircleIcon />}>
          Add new list
        </Button>
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
