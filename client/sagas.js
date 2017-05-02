import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import request from 'axios';

import APP from './constants';

export function* getList() {
  yield put({ type: APP.DASHBOARD.LIST_RECEIVING, status: true });
  try {
    const response = yield call(
      request.get,
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp',
    );
    yield put({ type: APP.DASHBOARD.LIST_RECEIVED, response });
  } catch (err) {
    yield put({ type: APP.DASHBOARD.LIST_RECEIVING_ERROR, error: err.message });
  } finally {
    yield put({ type: APP.DASHBOARD.LIST_RECEIVING, status: false });
  }
}

function* taskSagas() {
  yield [
    takeLatest(APP.DASHBOARD.GET_LIST, getList),
  ];
}

export default taskSagas;
