import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteBoard, fetchBoardData, updateBoard } from 'store/reducers/boards/boardsSlice';
import {
  ButtonGoBack,
  StyledDiv,
  StyledTypography,
  WrapperBoardFunctional,
  StyledForm,
} from './BoardHeader.styled';
import { ModalAddColumn } from './ModalAddColumn/ModalAddcolumn';

export const BoardHeader = () => {
  const { currentBoard } = useAppSelector((state) => state.boardsReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openAddColumnModal, setOpenAddColumnModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>();

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

  const onSubmit: SubmitHandler<{ title: string }> = async (data) => {
    const idBoard = currentBoard?.id as string;
    await dispatch(updateBoard({ id: idBoard, boardData: data }));
    await dispatch(fetchBoardData(idBoard));
    setEdit(false);
  };

  const { t } = useTranslation();

  return (
    <>
      <WrapperBoardFunctional>
        <ButtonGoBack variant="contained" onClick={() => navigate('/')}>
          <ArrowBackIosIcon /> {t('Go to main page')}
        </ButtonGoBack>
        <StyledDiv>
          {edit ? (
            <>
              <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="Title"
                  type="text"
                  {...register('title', {
                    required: true,
                  })}
                  fullWidth
                  defaultValue={currentBoard?.title}
                  error={errors?.title?.message ? true : false}
                  autoComplete="off"
                />
                <IconButton title="Save" type="submit" color="primary">
                  <SaveIcon />
                </IconButton>
                <IconButton color="primary" title="Cancel" onClick={() => setEdit(false)}>
                  <HighlightOffIcon />
                </IconButton>
              </StyledForm>
            </>
          ) : (
            <StyledTypography variant="h5" onDoubleClick={() => setEdit(true)}>
              {currentBoard?.title}
            </StyledTypography>
          )}
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
