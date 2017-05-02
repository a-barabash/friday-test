import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate, processSpecial } from 'redux-persist-immutable';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'remote-redux-devtools';

import sagas from './sagas'
import createReducers from './reducers';

export default function configureStore(initialState = {}, history) {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const composeEnhancers = composeWithDevTools({ realtime: process.env.NODE_ENV !== 'production', hostname: 'localhost', port: 8000 });

  const store = createStore(
    createReducers(),
    fromJS(initialState),
    composeEnhancers(applyMiddleware(...middleware), autoRehydrate()),
  );

  sagaMiddleware.run(sagas);
  persistStore(store);

  return store;
}
