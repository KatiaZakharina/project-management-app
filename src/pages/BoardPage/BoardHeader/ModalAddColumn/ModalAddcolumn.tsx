import { Button, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  StyledBox,
  StyledForm,
  StyledModal,
  WrapperError,
  StyledError,
} from './ModalAddColumn.styled';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useEffect, useState } from 'react';

interface IModalAddColumn {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

export const ModalAddColumn = ({ openModal, setOpenModal }: IModalAddColumn) => {
  const { currentBoard } = useAppSelector((state) => state.boardsReducer);
  const newOrder = currentBoard?.columns?.length as number;
  const [order, setOrder] = useState(newOrder);
  const dispatch = useAppDispatch();

  console.log(order);
  // console.log(currentBoard?.columns?.length);

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
    // const newBoard = await dispatch(createBoard(data));
    // await dispatch(fetchBoardData(newBoard.payload.id));
    handleClose();
  };

  return (
    <StyledModal open={openModal} onClose={handleClose}>
      <StyledBox>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Typography>New list</Typography>
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
