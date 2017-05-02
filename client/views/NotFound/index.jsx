import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

function NotFound() {
  return (
    <div>
      <h3>Not Found</h3>
      <Link to={'/'} >App</Link>
    </div>
  );
}

export default connect(null, null)(NotFound);
