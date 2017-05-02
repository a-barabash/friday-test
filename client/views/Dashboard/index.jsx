import React from 'react';
import { connect } from 'react-redux';

import Table from './components/Table';

class Characters extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Table/>
      </div>
    );
  }
}

export default connect(null, null)(Characters);
