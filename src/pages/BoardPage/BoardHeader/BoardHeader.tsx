import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { deleteBoard } from 'store/reducers/boards/boardsSlice';
import { useNavigate } from 'react-router-dom';
import {
  ButtonGoBack,
  StyledDiv,
  StyledTypography,
  WrapperBoardFunctional,
} from './BoardHeader.styled';
import { ModalAddColumn } from './ModalAddColumn/ModalAddcolumn';

export const BoardHeader = () => {
  const { currentBoard } = useAppSelector((state) => state.boardsReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const openModalAddColumn = () => {
    setOpenModal(true);
  };

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const onConfirm = async () => {
    if (currentBoard?.id) {
      await dispatch(deleteBoard(currentBoard?.id));
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
      <WrapperBoardFunctional>
        <ButtonGoBack variant="contained" onClick={() => navigate('/')}>
          <ArrowBackIosIcon /> {t('Back')}
        </ButtonGoBack>
        <StyledDiv>
          <StyledTypography variant="h5">{currentBoard?.title}</StyledTypography>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={openModalAddColumn}
          >
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
          Delete board
        </Button>
      </WrapperBoardFunctional>
      <ModalAddColumn openModal={openModal} setOpenModal={setOpenModal} />
      <ConfirmationModal
        openConfirmationModal={openConfirmationModal}
        onCancel={onCancel}
        onConfirm={onConfirm}
      ></ConfirmationModal>
    </>
  );
};
