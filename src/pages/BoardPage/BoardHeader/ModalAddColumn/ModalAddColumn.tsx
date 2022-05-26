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
import { createColumn } from 'store/reducers/boards/boardsSlice';

interface IModalAddColumn {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

export const ModalAddColumn = ({ openModal, setOpenModal }: IModalAddColumn) => {
  const { currentBoard } = useAppSelector((state) => state.boardsReducer);
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
  } = useForm<{ title: string }>();

  const onSubmit: SubmitHandler<{ title: string }> = async (data) => {
    const idBoard = currentBoard?.id as string;
    await dispatch(createColumn({ id: idBoard, columnData: data }));
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
