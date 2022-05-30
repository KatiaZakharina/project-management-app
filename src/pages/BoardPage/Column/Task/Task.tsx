import { useState } from 'react';

import { TaskList, TaskListWrapper } from './Task.styled';
import { TaskItem } from './TaskItem/TaskItem';
import { ConfirmationModal } from 'components/ConfirmationModal/ConfirmationModal';
import { BoardTasksType } from 'store/reducers/boards/types';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteTask, updateTask, updateTasks } from 'store/reducers/boards/boardsSlice';
import { ModalUpdateTask } from './ModalUpdateTask/ModalUpdateTask';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

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

  const reorder = (list: BoardTasksType[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    console.log('removed.userId', removed.userId);

    const updateTaskData = {
      boardId: boardId!,
      columnId: columnId,
      description: removed.description,
      order: endIndex + 1,
      title: removed.title,
      userId: removed.userId,
    };

    dispatch(
      updateTask({
        updateTaskData,
        taskId: removed.id,
      })
    );

    return result
      .map((task, index) => ({
        id: task.id,
        title: task.title,
        order: index + 1,
        description: task.description,
        userId: task.id,
      }))
      .sort((a, b) => a.order - b.order);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newTasks = reorder(tasks!, result.source.index, result.destination.index);
    dispatch(updateTasks({ columnId, newTasks }));
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <TaskListWrapper>
          <Droppable droppableId="droppable">
            {(provided) => (
              <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                {sortTask
                  .slice()
                  ?.sort((a, b) => a.order - b.order)
                  .map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          setCurrentTaskId={setCurrentTaskId}
                          setOpenConfirmationModal={setOpenConfirmationModal}
                          setOpenModalTransform={setOpenModalTransform}
                          provided={provided}
                        />
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </TaskListWrapper>
      </DragDropContext>

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
    </>
  );
}
