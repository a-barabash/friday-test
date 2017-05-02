const loadModule = cb => componentModule => cb(null, componentModule.default);

const errorLoading = (err) => {
  throw new Error('Dynamic page loading failed', err);
};

const buildRoute = (path, name, component, childRoutes = []) => ({
  path,
  name,
  getComponent(nextState, cb) {
    component()
    .then(loadModule(cb))
    .catch(errorLoading);
  },
  childRoutes,
});

const childRoutes = [
  buildRoute('/', 'dashboard', () => System.import('./views/Dashboard')),
];

const createRoutes = () => [
  buildRoute(null, null, () => System.import('./containers/App'), childRoutes),
  buildRoute('*', 'notfound', () => System.import('./views/NotFound')),
];

export default createRoutes;
