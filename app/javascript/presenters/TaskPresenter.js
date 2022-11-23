import PropTypes from 'prop-types';
import PropTypesPresenter from 'utils/PropTypesPresenter';

export default new PropTypesPresenter(
  {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    author: PropTypes.string,
    state: PropTypes.string,
    expiredAt: PropTypes.string,
  },
  {
    getName(task) {
      return `${this.name(task)}`;
    },
    getDescription(task) {
      return `${this.description(task)}`;
    },
    getTaskAuthor(task) {
      return `${this.author(task)}`;
    },
  },
);
