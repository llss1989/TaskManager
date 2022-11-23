import routes from 'routes';
import FetchHelper from 'utils/fetchHelper';

export default {
  index(params) {
    const path = routes.apiV1UsersPath();
    return FetchHelper.get(path, params);
  },
  show(params) {
    const path = routes.apiV1UserPath();
    return FetchHelper.get(path, params);
  },
};
