import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Table.css';
import { TableHead } from './TableHead/TableHead.lazy';
import { TableBody } from './TableBody/TableBody.lazy';
import { TableFooter } from './TableFooter/TableFooter.lazy';


const Table = (props) => {
  const [rows, setRows] = useState([])
  const [rowsHash, setRowsHash] = useState([])
  const [headers, setHeaders] = useState([])

  return (<div className="flex flex-col w-max bg-neutral-100">
    <table>
      <caption className="text-h4 text-neutral-800 text-left">{props.caption}</caption>
      <TableHead sortHeaders={props.sortHeaders}
        rows={rows}
        rowsHash={rowsHash}
        sortColumn={setRows}
        size={props.size}
        headers={props.headers}
        checkbox={props.checkbox}
        moreOptionsLength={props.moreOptions.length} />
      <TableBody />
    </table>
    {props.paginate && <TableFooter />}
  </div>)
};

Table.propTypes = {
  caption: PropTypes.string,
  paginate: PropTypes.bool
};

Table.defaultProps = {};

export default Table;
