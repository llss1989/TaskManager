import React, { useEffect, useState } from 'react';
import KanbanBoard from '@asseinfo/react-kanban';
import { propOr } from 'ramda';

import Task from '../Task';
import TasksRepository from '../../repositories/TasksRepository';
import ColumnHeader from '../ColumnHeader/ColumnHeader';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddPopup from '../AddPopup';
import TaskForm from '../../forms/TaskForm';
import EditPopup from '../EditPopup';
import useStyles from './useStyles';

const STATES = [
  { key: 'new_task', value: 'New' },
  { key: 'in_development', value: 'In Dev' },
  { key: 'in_qa', value: 'In QA' },
  { key: 'in_code_review', value: 'in CR' },
  { key: 'ready_for_release', value: 'Ready for release' },
  { key: 'released', value: 'Released' },
  { key: 'archived', value: 'Archived' },
];

const MODES = {
  ADD: 'add',
  NONE: 'none',
  EDIT: 'edit',
};

const initialBoard = {
  columns: STATES.map((column) => ({
    id: column.key,
    title: column.value,
    cards: [],
    meta: {},
  })),
};

function TaskBoard() {
  const [board, setBoard] = useState(initialBoard);
  const [boardCards, setBoardCards] = useState([]);
  const [mode, setMode] = useState(MODES.NONE);
  const [openedTaskId, setOpenedTaskId] = useState(null);

  useEffect(() => loadBoard(), []);
  useEffect(() => generateBoard(), [boardCards]);

  const styles = useStyles();

  const loadColumn = (state, page, perPage) =>
    TasksRepository.index({
      q: { stateEq: state },
      page,
      perPage,
    });

  const loadColumnInitial = (state, page = 1, perPage = 10) => {
    loadColumn(state, page, perPage).then(({ data }) => {
      setBoardCards((prevState) => ({
        ...prevState,
        [state]: { cards: data.items, meta: data.meta },
      }));
    });
  };

  const generateBoard = () => {
    const board = {
      columns: STATES.map(({ key, value }) => ({
        id: key,
        title: value,
        cards: propOr({}, 'cards', boardCards[key]),
        meta: propOr({}, 'meta', boardCards[key]),
      })),
    };

    setBoard(board);
  };

  const loadBoard = () => {
    STATES.map(({ key }) => loadColumnInitial(key));
  };
  const loadColumnMore = (state, page = 1, perPage = 10) => {
    loadColumn(state, page, perPage).then(({ data }) => {
      setBoardCards((prevState) => ({
        ...prevState,
        [state]: { cards: [...prevState[state].cards, ...data.items], meta: data.meta },
      }));
    });
  };
  const handleCardDragEnd = (task, source, destination) => {
    const transition = task.transitions.find(({ to }) => destination.toColumnId === to);
    if (!transition) {
      return null;
    }
    return TasksRepository.update(task.id, { id: task.id, task: { stateEvent: transition.event } })
      .then(() => {
        loadColumnInitial(destination.toColumnId);
        loadColumnInitial(source.fromColumnId);
      })
      .catch((error) => {
        alert(`Move failed! ${error.message}`);
      });
  };
  const handleAddPopupOpen = () => {
    setMode(MODES.ADD);
  };

  const handleClose = () => {
    setMode(MODES.NONE);
  };
  const handleTaskCreate = (params) => {
    const attributes = TaskForm.attributesToSubmit(params);
    return TasksRepository.create({ task: attributes }).then(({ data: { task } }) => {
      loadColumn(task.state, 1, 10).then(({ data }) => {
        setBoardCards((prevState) => ({
          ...prevState,
          [task.state]: { cards: data.items, meta: data.meta },
        }));
        setMode(MODES.NONE);
      });
    });
  };
  const loadTask = (id) => TasksRepository.show(id).then(({ data: { task } }) => task);

  const handleTaskUpdate = (task) => {
    const attributes = TaskForm.attributesToSubmit(task);

    return TasksRepository.update(task.id, attributes).then(() => {
      loadColumnInitial(task.state);
      handleClose();
    });
  };

  const handleTaskDestroy = (task) => {
    const attributes = TaskForm.attributesToDestroy(task);
    return TasksRepository.destroy(task.id, attributes).then(() => {
      loadColumnInitial(task.state);
      handleClose();
    });
  };
  const handleEditPopupOpen = (task) => {
    setOpenedTaskId(task.id);
    setMode(MODES.EDIT);
  };

  return (
    <div>
      {mode === MODES.EDIT && (
        <EditPopup
          onCardLoad={loadTask}
          onCardDestroy={handleTaskDestroy}
          onCardUpdate={handleTaskUpdate}
          onClose={handleClose}
          cardId={openedTaskId}
        />
      )}
      {mode === MODES.ADD && <AddPopup onCardCreate={handleTaskCreate} onClose={handleClose} />}
      <Fab className={styles.addButton} color="primary" aria-label="add" onClick={handleAddPopupOpen}>
        <AddIcon />
      </Fab>
      <KanbanBoard
        renderColumnHeader={(column) => <ColumnHeader column={column} onLoadMore={loadColumnMore} />}
        renderCard={(card) => <Task onClick={handleEditPopupOpen} task={card} />}
        onCardDragEnd={handleCardDragEnd}
      >
        {board}
      </KanbanBoard>
    </div>
  );
}

export default TaskBoard;
