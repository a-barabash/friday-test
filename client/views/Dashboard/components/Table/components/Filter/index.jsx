import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { TextField } from 'material-ui';

import APP from '../../../../../../constants';

class Filter extends React.Component {

  constructor(props) {
    super(props);
    this.changeFilter = this.changeFilter.bind(this);
    this.state = { filter: this.props.filter };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ filter: nextProps.filter });
  }

  changeFilter(e, newValue) {
    clearTimeout(this.state.timeoutId);
    const timeoutId = setTimeout(() => {
      this.props.setFilter(newValue);
    }, 500);
    this.setState({ filter: newValue, timeoutId });
  }

  render() {
    return (
      <TextField
        hintText=""
        floatingLabelText="Filter by place"
        value={this.state.filter}
        onChange={this.changeFilter}
      />
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  setFilter: filter => dispatch({ type: APP.DASHBOARD.SET_LIST_FILTER, filter }),
});

export default connect(null, mapDispatchToProps)(Filter);
