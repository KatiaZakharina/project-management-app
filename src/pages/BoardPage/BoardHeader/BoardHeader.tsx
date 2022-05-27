import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteBoard, updateBoard } from 'store/reducers/boards/boardsSlice';
import { StyledButton, StyledDiv, StyledSpan, WrapperBoardFunctional } from './BoardHeader.styled';
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
        <StyledButton variant="contained" onClick={() => navigate('/')}>
          <ArrowBackIosIcon />
          <StyledSpan>{t('Go to main page')}</StyledSpan>
        </StyledButton>
        <StyledDiv>
          <EditingTitle title={currentBoard?.title} onTitleSubmit={updateBoardTitle} styles="h5" />
          <StyledButton
            variant="outlined"
            color="primary"
            onClick={() => setOpenAddColumnModal(true)}
          >
            <AddCircleIcon />
            <StyledSpan>{t('Add new list')}</StyledSpan>
          </StyledButton>
        </StyledDiv>
        <StyledButton
          data-tag="delete-button"
          variant="contained"
          color="warning"
          onClick={() => {
            setOpenConfirmationModal(true);
          }}
        >
          <DeleteIcon />
          <StyledSpan>{t('Delete board')}</StyledSpan>
        </StyledButton>
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
