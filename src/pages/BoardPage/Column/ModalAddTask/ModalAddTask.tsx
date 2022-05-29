import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { createTask } from 'store/reducers/boards/boardsSlice';
import { ModalContext, StyledModal } from 'styles/ModalTask.styled';
import { Inputs, createNewTask } from './useMakeInput';

interface IModalAddTask {
  columnId: string;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

export function ModalAddTask({ openModal, setOpenModal, columnId }: IModalAddTask) {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((store) => store.userReducer);
  const { currentBoard } = useAppSelector((state) => state.boardsReducer);

  const { register, handleSubmit, reset } = useForm<Inputs>();
  const [executor, setExecutor] = useState('');

  const { inputs } = createNewTask(register);

  function handleClose() {
    setOpenModal(false);
  }

  const onSubmit: SubmitHandler<{ title: string; description: string; executor: string }> = async (
    data
  ) => {
    const newTaskData = {
      title: data.title,
      description: data.description,
      userId: executor,
    };
    dispatch(
      createTask({
        boardId: currentBoard?.id as string,
        columnId: columnId,
        taskData: newTaskData,
      })
    );
    reset();
    setExecutor('');
    handleClose();
  };

  const { t } = useTranslation();

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
          <InputLabel>{t('Assignee')}</InputLabel>
          <Select
            label={t('Assignee')}
            onChange={(event) => setExecutor(event.target.value)}
            value={executor}
          >
            <MenuItem selected disabled>
              {t('Assignee')}
            </MenuItem>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id ?? ''}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit">{t('Save and Close')}</Button>
      </ModalContext>
    </StyledModal>
  );
}
