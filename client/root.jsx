import 'babel-polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { MuiThemeProvider } from 'material-ui';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';

import App from './containers/App';
import configureStore from './store';
import createRoutes from './routes';

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }
    return prevRoutingStateJS;
  };
};

const initialState = {};
const store = configureStore(initialState, browserHistory);

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: selectLocationState(),
});

const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};

injectTapEventPlugin();

const Root = () => (
  <MuiThemeProvider>
    <Provider store={store}>
      <Router
        history={history}
        routes={rootRoute}
        render={applyRouterMiddleware(useScroll())}
      />
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
