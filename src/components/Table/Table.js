import React from 'react';
import PropTypes from 'prop-types';
import './Table.css';
import { TableHead } from './TableHead/TableHead.lazy';
import { TableBody } from './TableBody/TableBody.lazy';
import { TableFooter } from './TableFooter/TableFooter.lazy';


const Table = (props) => (
  <div className="flex flex-col w-max bg-neutral-100">
    <table>
      <caption className="text-h4 text-neutral-800 text-left">{props.caption}</caption>
      <TableHead />
      <TableBody />
    </table>
    {props.paginate && <TableFooter />}
  </div>
);

Table.propTypes = {
  caption: PropTypes.string,
  paginate: PropTypes.bool
};

Table.defaultProps = {};

export default Table;
