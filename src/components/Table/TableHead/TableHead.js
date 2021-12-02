import React from 'react';
import PropTypes from 'prop-types';
import './TableHead.css';
import { getRowClass, padding, borderBottomClass } from '../commons';
import { Control } from '../../Control/Control.lazy';
import { Icon } from '../../Icon/Icon.lazy';

const TableHead = (props) => {

  const canSort = (header) => {
    return props.sortHeaders.some(val => val.value === header);
  }

  const sortColumn = (header) => {
    if (canSort(header)) {
      const order = props.sortHeaders.find(val => val.value === header)?.sort;
      if (order) {
        const rows = [...props.rows].sort((row1, row2) => {
          const text1 = (props.rowsHash.get(row1.id)?.get(header)?.text ?? '').toLowerCase();
          const text2 = (this.rowsHash.get(row2.id)?.get(header)?.text ?? '').toLowerCase();
          if (order === 'asc') {
            return text1 < text2 ? -1 : text2 > text1 ? 1 : 0
          } else {
            return text1 > text2 ? -1 : text2 < text1 ? 1 : 0
          }
        })
        props.sortColumn(rows);
      }
    }
  }

  return (<thead className={getRowClass(false, false, props.size)}>
    {props.checkbox && <th className={() => (`${padding()} text-left ${borderBottomClass(false)}`)}>
      <Control />
    </th>}
    {props.headers.map(header => (
      <th key={header} className={() => (`${borderBottomClass(false)} ${padding()} text-left`)}>
        <div onClick={sortColumn(header)} className={canSort(header) && 'cursor-pointer'}>
          <span className="text-subtitle2 text-neutral-700">{header}</span>
          <Icon />
        </div>
      </th>
    ))}
    {props.moreOptionsLength && <th className={borderBottomClass(false)} />}
  </thead>)
};

TableHead.propTypes = {
  checkbox: PropTypes.bool,
  headers: PropTypes.array,
  moreOptionsLength: PropTypes.number,
  sortHeaders: PropTypes.array,
  rowsHash: PropTypes.array,
  size: PropTypes.oneOf(['default', 'dense'])
};

TableHead.defaultProps = {};

export default TableHead;
