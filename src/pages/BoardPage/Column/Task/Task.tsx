import { useState } from 'react';

import { TaskList, TaskListWrapper } from './Task.styled';
import { TaskItem } from './TaskItem/TaskItem';
import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { BoardTasksType } from 'store/reducers/boards/types';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteTask } from 'store/reducers/boards/boardsSlice';
import { ModalUpdateTask } from './ModalUpdateTask/ModalUpdateTask';

interface ITaskProps {
  tasks: BoardTasksType[] | undefined;
  columnId: string;
}

export function Task({ tasks, columnId }: ITaskProps) {
  const dispatch = useAppDispatch();
  const boardId = useAppSelector((state) => state.boardsReducer.currentBoard?.id);

  const [openModalTransform, setOpenModalTransform] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState('');

  const onCancel = () => {
    setOpenConfirmationModal(false);
  };

  const onConfirm = () => {
    if (boardId) {
      dispatch(deleteTask({ boardId, columnId, taskId: currentTaskId }));
    }
    setOpenConfirmationModal(false);
  };

  const sortTask = tasks ? [...tasks] : [];

  return (
    <TaskListWrapper>
      <TaskList>
        {sortTask
          ?.sort((a, b) => a.order - b.order)
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              setCurrentTaskId={setCurrentTaskId}
              setOpenConfirmationModal={setOpenConfirmationModal}
              setOpenModalTransform={setOpenModalTransform}
            />
          ))}
        {openModalTransform && (
          <ModalUpdateTask
            openModal={openModalTransform}
            setOpenModal={setOpenModalTransform}
            columnId={columnId}
            taskId={currentTaskId}
          />
        )}
        {openConfirmationModal && (
          <ConfirmationModal
            openConfirmationModal={openConfirmationModal}
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        )}
      </TaskList>
    </TaskListWrapper>
  );
}
