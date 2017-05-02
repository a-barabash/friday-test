import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { REHYDRATE } from 'redux-persist/constants'

import APP from './constants';

const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

const initialState = fromJS({
  dashboard: {
    data: {
      list: [],
      received: null,
    },
    searchFilter: '',
  },
});

const eqfeed_callback = (response) => {
  const list = response.features.map(feature => ({
    mag: feature.properties.mag,
    place: feature.properties.place,
    time: feature.properties.time,
    updated: feature.properties.updated,
    type: feature.properties.type,
  }));

  return { list, received: new Date().getTime() };
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case APP.DASHBOARD.LIST_RECEIVED:
      return state.setIn(['dashboard', 'data'], fromJS(eval(action.response.data)));

    case APP.DASHBOARD.SET_LIST_FILTER:
      return state.setIn(['dashboard', 'searchFilter'], action.filter);

    case REHYDRATE:
      return typeof action.payload.app !== 'undefined' ?
        action.payload.app : state;

    default:
      return state;
  }
}

export default function createReducers() {
  return combineReducers({
    route: routeReducer,
    app: appReducer,
  });
}
