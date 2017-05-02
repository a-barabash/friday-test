import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const App = props => (
  <div>
    { props.children }
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

export default connect(null, null)(App);
