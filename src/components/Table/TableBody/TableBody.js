import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TableBody.css';
import { borderBottomClass, getRowClass, padding } from '../commons';
import Checkbox from '../../Checkbox/Checkbox';
import Icon from '../../Icon/Icon';
import More from '../More/More';

const TableBody = ({ rows, isSelected, checkbox, size, moreOptionsLength, convertRowToData, toggleRow }) => {
  const [currentMoreOptionId, setCurrentMoreOptionId] = useState(-5)

  const isLast = (arrayLength, index) => {
    return (arrayLength - 1) === index;
  }

  const setCurrentOptionId = (id) => setCurrentMoreOptionId(id)

  const moreClickAction = (clickAction, row) => clickAction(convertRowToData(row))

  const switchAction = cell => {
    switch (cell.type) {
      case 'text':
        return <div>
          {cell.img && <img className="mr-8" alt={cell.text} src={cell.img} />}
          {cell.icon && <Icon className="mr-8" name={cell.icon} />}
          <span className="text-body1-regular text-neutral-700">{cell.text}</span>
        </div>
      case 'template':
        return <>{cell.template}</>
      default:
        return <></>
    }
  }

  return (
    <tbody>
      {
        rows.map((row, index) =>
          <tr key={row.id} className={getRowClass(isLast(row.length, index), isSelected(row))}>
            {checkbox && <td className={`${borderBottomClass(isLast(row.length, index))} ${padding(size)}`}>
              <Checkbox value={isSelected(row)} onChange={val => toggleRow(row, Boolean(val))} />
            </td>}
            {
              row.value.map((cell, index) =>
                <td key={cell?.text ?? index} className={`${borderBottomClass(isLast(row.length, index))} ${padding(size)}`}>
                  {switchAction(cell)}
                </td>)
            }
            {
              Boolean(moreOptionsLength) &&
              <td>
                <More id={row.id}
                  onSetCurrentOptionId={(id) => setCurrentOptionId(id)}
                  currentOptionId={currentMoreOptionId}
                  onMoreClick={(_e, clickAction) => moreClickAction(clickAction, row)} />
              </td>
            }
          </tr>)
      }
    </tbody>

  )
};

TableBody.propTypes = {
  rows: PropTypes.array,
  isSelected: PropTypes.func,
  checkbox: PropTypes.bool,
  size: PropTypes.oneOf(['default', 'dense']),
  template: PropTypes.element,
  moreOptionsLength: PropTypes.number,
  convertRowToData: PropTypes.func,
  toggleRow: PropTypes.func
};

TableBody.defaultProps = {};

export default TableBody;
