import { Button, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  StyledBox,
  StyledForm,
  StyledModal,
  WrapperError,
  StyledError,
} from './ModalAddBoard.styled';
import { BoardDataType } from 'store/reducers/boards/types';
import { boardsServiceInstance } from 'service/boardsService';

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
    const newBoard: BoardDataType = await boardsServiceInstance.createBoard(data);
    //TODO: move to async thunk
    navigate(`/boards/${newBoard.id}`);
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
