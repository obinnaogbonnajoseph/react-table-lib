import React from 'react';
import PropTypes from 'prop-types';
import './TableHead.css';
import { getRowClass, padding, borderBottomClass } from '../commons';
import { Checkbox } from '../../Checkbox/Checkbox';
import { Icon } from '../../Icon/Icon.lazy';

const TableHead = ({ sortHeaders, rows, rowsHash, size, onSortColumn, moreOptionsLength, headers, checkbox }) => {

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

  return (<thead className={getRowClass(false, false, size)}>
    {checkbox && <th className={() => (`${padding()} text-left ${borderBottomClass(false)}`)}>
      <Checkbox />
    </th>}
    {headers.map(header => (
      <th key={header} className={() => (`${borderBottomClass(false)} ${padding()} text-left`)}>
        <div onClick={sortColumn(header)} className={canSort(header) && 'cursor-pointer'}>
          <span className="text-subtitle2 text-neutral-700">{header}</span>
          <Icon />
        </div>
      </th>
    ))}
    {moreOptionsLength && <th className={borderBottomClass(false)} />}
  </thead>)
};

TableHead.propTypes = {
  checkbox: PropTypes.bool,
  headers: PropTypes.array,
  moreOptionsLength: PropTypes.number,
  sortHeaders: PropTypes.array,
  rows: PropTypes.array,
  onSortColumn: PropTypes.func,
  rowsHash: PropTypes.array,
  size: PropTypes.oneOf(['default', 'dense'])
};

TableHead.defaultProps = {};

export default TableHead;
