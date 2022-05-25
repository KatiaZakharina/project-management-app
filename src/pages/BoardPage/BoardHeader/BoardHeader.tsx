import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteBoard, updateBoard } from 'store/reducers/boards/boardsSlice';
import { ButtonGoBack, StyledDiv, WrapperBoardFunctional } from './BoardHeader.styled';
import { ModalAddColumn } from './ModalAddColumn/ModalAddColumn';
import { EditingTitle } from 'components/EditingTitle/EditingTitle';

export const BoardHeader = () => {
  const { currentBoard } = useAppSelector((state) => state.boardsReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openAddColumnModal, setOpenAddColumnModal] = useState(false);
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

  const updateBoardTitle = async (data: { title: string }) => {
    const idBoard = currentBoard?.id as string;
    const description = currentBoard?.description as string;
    const newData = {
      title: data.title,
      description,
    };
    await dispatch(updateBoard({ id: idBoard, boardData: newData }));
  };

  const { t } = useTranslation();

  return (
    <>
      <WrapperBoardFunctional>
        <ButtonGoBack variant="contained" onClick={() => navigate('/')}>
          <ArrowBackIosIcon /> {t('Go to main page')}
        </ButtonGoBack>
        <StyledDiv>
          <EditingTitle title={currentBoard?.title} onTitleSubmit={updateBoardTitle} styles="h5" />
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={() => setOpenAddColumnModal(true)}
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
      <ModalAddColumn openModal={openAddColumnModal} setOpenModal={setOpenAddColumnModal} />
      <ConfirmationModal
        openConfirmationModal={openConfirmationModal}
        onCancel={onCancel}
        onConfirm={onConfirm}
      ></ConfirmationModal>
    </>
  );
};
