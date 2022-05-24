import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { updateTask } from 'store/reducers/boards/boardsSlice';
import { ModalContext, StyledModal } from 'styles/ModalTask.styled';
import { Inputs, createNewTask } from '../../ModalAddTask/useMakeInput';

interface IModalUpdateTask {
  columnId: string;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  taskId: string;
}

export function ModalUpdateTask({ openModal, setOpenModal, columnId, taskId }: IModalUpdateTask) {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((store) => store.userReducer);
  const { currentBoard } = useAppSelector((state) => state.boardsReducer);

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const [executor, setExecutor] = useState('');

  if (!currentBoard?.columns) return <></>;
  const currentColumnIndex = currentBoard?.columns?.findIndex((column) => column.id === columnId);

  if (!currentBoard?.columns || (!currentColumnIndex && currentColumnIndex !== 0)) return <></>;
  const currentTaskIndex = currentBoard?.columns[currentColumnIndex].tasks?.findIndex(
    (task: { id: string | undefined }) => task.id === taskId
  );

  const titleContent = currentBoard.columns[currentColumnIndex].tasks![currentTaskIndex!].title;
  const descriptionContent =
    currentBoard.columns[currentColumnIndex].tasks![currentTaskIndex!].description;

  const { inputs } = createNewTask(register, titleContent, descriptionContent);

  function handleClose() {
    setOpenModal(false);
  }

  const onSubmit: SubmitHandler<{ title: string; description: string; executor: string }> = async (
    data
  ) => {
    const updateTaskData = {
      title: data.title,
      order: 1,
      description: data.description,
      userId: executor,
      boardId: currentBoard?.id,
      columnId: columnId,
    };

    dispatch(
      updateTask({
        boardId: currentBoard?.id as string,
        columnId: columnId,
        taskData: updateTaskData,
        taskId: taskId,
      })
    );
    reset();
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
            defaultValue={input.content}
          />
        ))}

        <FormControl>
          <InputLabel>Executor</InputLabel>
          <Select
            label="Executor"
            onChange={(event) => setExecutor(event.target.value)}
            value={executor}
          >
            <MenuItem selected disabled>
              Executors
            </MenuItem>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id ?? ''}>
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
