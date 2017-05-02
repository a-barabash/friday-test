import React from 'react';
import PropTypes from 'prop-types';
import { is, Map } from 'immutable';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import Filter from './components/Filter'
import selector from './selectors';
import styles from './styles.scss';
import APP from '../../../../constants';

class DataTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshInterval: 300000,
    }
  }

  shouldComponentUpdate(nextProps) {
    const rules = [
      !is(this.props.data, nextProps.data),
      this.props.searchFilter !== nextProps.searchFilter,
    ];

    return rules.some(item => item);
  }

  componentWillMount() {
    const received = this.props.data.get('received');
    if (!received || received < (new Date().getTime() - this.state.refreshInterval)) {
      this.props.getData();
    }
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
  }

  render() {
    let headerFix = null;

    if (this.props.data.get('list').size >= 12) {
      headerFix = <TableHeaderColumn className={styles.tableHeaderFix} />;
    }

    return (
      <div className={styles.vDashboardTable}>
        <Filter filter={this.props.searchFilter} />
        <div className={styles.tableCaption}>
          <span className={styles.title}>USGS All Earthquakes, Past Day</span>
        </div>

        <Table height="600px" selectable={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn tooltip="Textual description of named geographic region near to the event" className={`${styles.tableHeaderColumn} ${styles.firstColumn}`}>
                Place
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="The magnitude for the event" className={styles.tableHeaderColumn}>
                Magnitude
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Time when the event occurred" className={styles.tableHeaderColumn}>
                Time (UTC)
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Time when the event was most recently updated" className={styles.tableHeaderColumn}>
                Updated (UTC)
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Type of seismic event" className={styles.tableHeaderColumn}>
                Type
              </TableHeaderColumn>
              { headerFix }
            </TableRow>
          </TableHeader>
          <TableBody showRowHover displayRowCheckbox={false}>
            {this.props.data.get('list')
              .map(row => (
                <TableRow key={`${row.get('place')}:${row.get('time')}`} className={styles.tableBodyRow}>
                  <TableRowColumn className={styles.firstColumn}>{row.get('place')}</TableRowColumn>
                  <TableRowColumn>{row.get('mag')}</TableRowColumn>
                  <TableRowColumn>{new Date(row.get('time')).toUTCString()}</TableRowColumn>
                  <TableRowColumn>{new Date(row.get('updated')).toUTCString()}</TableRowColumn>
                  <TableRowColumn>{row.get('type')}</TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

DataTable.propTypes = {
  data: PropTypes.instanceOf(Map),
  searchFilter: PropTypes.string,
};

const mapStateToProps = state => ({
  data: selector.selectData(state),
  searchFilter: selector.selectSearchFilter(state),
});

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch({ type: APP.DASHBOARD.GET_LIST }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
