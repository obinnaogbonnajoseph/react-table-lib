import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Table.css';
import { TableHead } from './TableHead/TableHead';
import { TableBody } from './TableBody/TableBody';
import { TableFooter } from './TableFooter/TableFooter';


const Table = ({ caption, sortHeaders, size, headers, checkbox, moreOptions, paginate }) => {
  const [rows, setRows] = useState([])
  const [rowsHash, setRowsHash] = useState([])
  const [headers, setHeaders] = useState([])

  return (<div className="flex flex-col w-max bg-neutral-100">
    <table>
      <caption className="text-h4 text-neutral-800 text-left">{caption}</caption>
      <TableHead sortHeaders={sortHeaders}
        rows={rows}
        rowsHash={rowsHash}
        sortColumn={setRows}
        size={size}
        headers={headers}
        checkbox={checkbox}
        moreOptionsLength={moreOptions.length} />
      <TableBody />
    </table>
    {paginate && <TableFooter />}
  </div>)
};

Table.propTypes = {
  caption: PropTypes.string,
  paginate: PropTypes.bool,
  sortHeaders: PropTypes.arrayOf(PropTypes.string),
  size: PropTypes.oneOf(['default', 'dense']),
  headers: PropTypes.arrayOf(PropTypes.string),
  checkbox: PropTypes.bool,
  moreOptions: PropTypes.arrayOf(PropTypes.exact({
    text: PropTypes.string,
    icon: PropTypes.string,
    action: PropTypes.func
  }))
};

Table.defaultProps = {
  size: 'default'
};

export default Table;
