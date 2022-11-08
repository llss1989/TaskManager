import React from 'react';
import Board from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';

const data = {
  columns: [
    {
      id: 1,
      title: 'Backlog',
      cards: [
        {
          id: 1,
          title: 'Add card',
          description: 'Add capability to add a card in a column',
        },
      ],
    },
    {
      id: 2,
      title: 'Doing',
      cards: [
        {
          id: 2,
          title: 'Drag-n-drop support',
          description: 'Move a card between the columns',
        },
        {
          id: 3,
          title: 'JS',
          description: 'Learning Promises',
        },
        {
          id: 4,
          title: 'React',
          description: 'Learning React Hooks',
        },
      ],
    },
  ],
};

function TaskBoard() {
  return <Board disableColumnDrag initialBoard={data} />;
}

export default TaskBoard;
