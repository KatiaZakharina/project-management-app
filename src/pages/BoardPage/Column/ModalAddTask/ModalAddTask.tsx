import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { createTask } from 'store/reducers/boards/boardsSlice';
import { getAllUsers } from 'store/reducers/user/userSlice';
import { ModalContext, StyledModal } from './ModalAddTask.styled';
import { Inputs, useCreateNewTask } from './useMakeInput';

interface IModalAddColumn {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

export function ModalAddTask({ openModal, setOpenModal }: IModalAddColumn) {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((store) => store.userReducer);
  const { currentBoard } = useAppSelector((state) => state.boardsReducer);
  const { register, handleSubmit } = useForm<Inputs>();

  const { inputs } = useCreateNewTask(register);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  function handleClose() {
    setOpenModal(false);
  }

  const onSubmit: SubmitHandler<{ title: string; description: string; executor: string }> = async (
    data
  ) => {
    const newTaskData = {
      title: data.title,
      order: 1,
      description: data.description,
      userId: data.executor,
    };
    dispatch(
      createTask({
        boardsId: currentBoard?.id as string,
        columnId: '359e81dc-8e55-4764-9dea-f7a1f9ff6db2',
        taskData: newTaskData,
      })
    );
    handleClose();
  };

  return (
    <StyledModal open={openModal} onClose={handleClose}>
      <ModalContext onSubmit={handleSubmit(onSubmit)}>
        {inputs.map((input) => (
          <TextField
            key={input.id}
            placeholder={input.placeholder}
            label={input.label}
            variant={input.variant}
            rows={input.rows}
            multiline={input.multiline}
            {...input.register}
          />
        ))}
        <FormControl>
          <InputLabel>Executor</InputLabel>
          <Select label="Executor" {...register('executor')}>
            <MenuItem selected disabled>
              Executors
            </MenuItem>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit">Close Child Modal</Button>
      </ModalContext>
    </StyledModal>
  );
}
