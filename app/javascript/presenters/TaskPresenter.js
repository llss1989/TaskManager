import PropTypes from 'prop-types';
import PropTypesPresenter from 'utils/PropTypesPresenter';

export default new PropTypesPresenter(
  {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
  },
  {
    getName(task) {
      return `${this.name(task)}`;
    },
    getDescription(task) {
      return `${this.description(task)}`;
    },
  },
);
