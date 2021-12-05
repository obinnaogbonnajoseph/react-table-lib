import React from 'react';
import PropTypes from 'prop-types';
import './TableHead.css';
import { getRowClass, padding, borderBottomClass } from '../commons';
import Checkbox from '../../Checkbox/Checkbox'
import Icon from '../../Icon/Icon';

const TableHead = ({ sortHeaders, rows, rowsHash, size, onSortColumn, moreOptionsLength, headers, checkbox, checkboxVal, toggleAll }) => {

  const canSort = (header) => {
    return sortHeaders.some(val => val.value === header);
  }

  const sortColumn = (header) => {
    if (canSort(header)) {
      const order = sortHeaders.find(val => val.value === header)?.sort;
      if (order) {
        const sortedRows = [...rows].sort((row1, row2) => {
          const text1 = (rowsHash.get(row1.id)?.get(header)?.text ?? '').toLowerCase();
          const text2 = (rowsHash.get(row2.id)?.get(header)?.text ?? '').toLowerCase();
          if (order === 'asc') {
            return text1 < text2 ? -1 : text2 > text1 ? 1 : 0
          } else {
            return text1 > text2 ? -1 : text2 < text1 ? 1 : 0
          }
        })
        onSortColumn(sortedRows);
      }
    }
  }

  return (
    <thead className={getRowClass(false, false, size)}>
      <tr>
        {checkbox &&
          <th className={`${padding()} text-left ${borderBottomClass(false)}`}>
            <Checkbox value={checkboxVal} onChange={val => toggleAll(Boolean(val))} />
          </th>}
        {headers.map(header => (
          <th key={header} className={`${borderBottomClass(false)} ${padding()} text-left`}>
            <div onClick={sortColumn(header)} className={canSort(header) ? 'cursor-pointer' : ''}>
              <span className="text-subtitle2 text-neutral-700">{header}</span>
              {canSort(header) && <Icon />}
            </div>
          </th>
        ))}
        {Boolean(moreOptionsLength) && <th className={borderBottomClass(false)}></th>}
      </tr>

    </thead>)
};

TableHead.propTypes = {
  checkbox: PropTypes.bool,
  headers: PropTypes.array,
  moreOptionsLength: PropTypes.number,
  sortHeaders: PropTypes.array,
  rows: PropTypes.array,
  onSortColumn: PropTypes.func,
  rowsHash: PropTypes.object,
  size: PropTypes.oneOf(['default', 'dense']),
  checkboxVal: PropTypes.bool,
  toggleAll: PropTypes.func
};

TableHead.defaultProps = {
  sortHeaders: []
};

export default TableHead;
