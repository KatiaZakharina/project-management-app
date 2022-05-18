import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { Header } from 'components/Header/Header';
import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { Button } from '@mui/material';
import { WrapperBoardFunctional } from './BoardPage.styled';
import { useParams } from 'react-router-dom';

export const BoardPage = () => {
  const { boardID } = useParams();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const onConfirm = async () => {};

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
