import { createSelector } from 'reselect';

const stateSelector = state => state;

const selectData = createSelector(
  stateSelector,
  (state) => {
    let data = state.getIn(['app', 'dashboard', 'data']);
    let list = data.get('list');

    if (list.size) {
      list = list.sort((a, b) => a.get('time') < b.get('time'));
      const searchFilterPath = ['app', 'dashboard', 'searchFilter'];

      if (state.hasIn(searchFilterPath)) {
        const filter = state.getIn(searchFilterPath).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

        if (filter) {
          list = list.filter(character => character.get('place').search(new RegExp(filter, 'i')) !== -1);
        }
      }

      data = data.merge({ list });
    }

    return data;
  },
);

const selectSearchFilter = createSelector(
  stateSelector,
  (state) => {
    const path = ['app', 'dashboard', 'searchFilter'];
    return state.hasIn(path) ? state.getIn(path) : '';
  },
);

export default {
  selectData,
  selectSearchFilter,
};