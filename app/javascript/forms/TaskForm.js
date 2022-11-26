import { pick, propOr } from 'ramda';

export default {
  defaultAttributes(attributes) {
    return {
      name: '',
      description: '',
      ...attributes,
    };
  },

  attributesToSubmit(task) {
    const pertmittedKeys = ['id', 'name', 'description'];

    return {
      ...pick(pertmittedKeys, task),
      assigneeId: propOr(null, 'id', task.assignee),
      authorId: propOr(null, 'id', task.author),
    };
  },
  attributesToDestroy(task) {
    const pertmittedKeys = ['id'];
    return {
      ...pick(pertmittedKeys, task),
    };
  },
};
