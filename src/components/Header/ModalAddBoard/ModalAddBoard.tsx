import { Button, TextField, Typography } from '@mui/material';
import { BoardDataType } from 'appConstants/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { loginServiceInstance } from 'service/userService';
import {
  StyledBox,
  StyledForm,
  StyledModal,
  WrapperError,
  StyledError,
} from './ModalAddBoard.styled';

interface IModalAddBoard {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

export const ModalAddBoard = ({ openModal, setOpenModal }: IModalAddBoard) => {
  const navigate = useNavigate();

  const handleClose = () => {
    setOpenModal(false);
    reset();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ title: string }>();

  const onSubmit: SubmitHandler<{ title: string }> = async (data) => {
    const newBoard: BoardDataType = await loginServiceInstance.createBoard(data);
    navigate(`/board/${newBoard.id}`);
    handleClose();
  };

  return (
    <StyledModal open={openModal} onClose={handleClose}>
      <StyledBox>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Typography>New board</Typography>
          <TextField
            label="Title"
            type="text"
            {...register('title', {
              required: 'This field is required',
            })}
            fullWidth
            error={errors?.title?.message ? true : false}
            autoComplete="off"
          />
          <WrapperError>
            <StyledError>{errors?.title?.message}</StyledError>
          </WrapperError>
          <Button variant="outlined" type="submit">
            Create!
          </Button>
        </StyledForm>
      </StyledBox>
    </StyledModal>
  );
};
