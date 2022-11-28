import { useSelector } from 'react-redux';
import { useTasksActions } from 'slices/TasksSlice';

const useTasks = () => {
  const board = useSelector((state) => state.TasksSlice.board);
  const { loadBoard, loadColumn, loadColumnMore, cardDragEnd, taskCreate, taskLoad, taskUpdate, taskDestroy } =
    useTasksActions();

  return {
    board,
    loadColumn,
    loadBoard,
    loadColumnMore,
    cardDragEnd,
    taskCreate,
    taskLoad,
    taskUpdate,
    taskDestroy,
  };
};

export default useTasks;
