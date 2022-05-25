import { Button, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  StyledBox,
  StyledForm,
  StyledModal,
  WrapperError,
  StyledError,
} from './ModalAddBoard.styled';
import { createBoard } from 'store/reducers/boards/boardsSlice';
import { useAppDispatch } from 'store/hooks';
import { BoardDataType } from 'store/reducers/boards/types';

interface IModalAddBoard {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

export const ModalAddBoard = ({ openModal, setOpenModal }: IModalAddBoard) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpenModal(false);
    reset();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ title: string; description: string }>();

  const onSubmit: SubmitHandler<{ title: string; description: string }> = async (data) => {
    const boardData = await dispatch(createBoard(data));
    const newBoard = boardData.payload as BoardDataType;
    navigate(`/boards/${newBoard.id}`);
    handleClose();
  };

  const { t } = useTranslation();

  return (
    <StyledModal open={openModal} onClose={handleClose}>
      <StyledBox>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Typography>{t('New board')}</Typography>
          <TextField
            label={t('Title')}
            type="text"
            {...register('title', {
              required: t('This field is required'),
            })}
            fullWidth
            error={errors?.title?.message ? true : false}
            autoComplete="off"
          />
          <WrapperError>
            <StyledError>{errors?.title?.message}</StyledError>
          </WrapperError>
          <TextField
            label={t('Description')}
            type="text"
            {...register('description', {
              required: t('This field is required'),
            })}
            fullWidth
            error={errors?.description?.message ? true : false}
            autoComplete="off"
          />
          <WrapperError>
            <StyledError>{errors?.description?.message}</StyledError>
          </WrapperError>
          <Button variant="outlined" type="submit">
            {t('Create!')}
          </Button>
        </StyledForm>
      </StyledBox>
    </StyledModal>
  );
};
