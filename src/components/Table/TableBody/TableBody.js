import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TableBody.css';
import { borderBottomClass, getRowClass, padding } from '../commons';
import Checkbox from '../../Checkbox/Checkbox';
import Icon from '../../Icon/Icon';
import More from '../More/More';

const TableBody = ({ rows, isSelected, checkbox, size, moreOptions, convertRowToData, toggleRow }) => {
  const [currentMoreOptionId, setCurrentMoreOptionId] = useState(-5)

  const isLast = (arrayLength, index) => {
    return (arrayLength - 1) === index;
  }

  const setCurrentOptionId = (id) => {
    const newId = id === currentMoreOptionId ? -5 : id;
    setCurrentMoreOptionId(newId)
  }

  const moreClickAction = (clickAction, row) => clickAction(convertRowToData(row))

  const switchAction = cell => {
    switch (cell.type) {
      case 'text':
        return <div>
          {cell.img && <img className="mr-8" alt={cell.text} src={cell.img} />}
          {cell.icon && <Icon className="mr-8 material-icons" iconName={cell.icon} />}
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
          <tr key={row.id} className={getRowClass(isLast(rows.length, index), isSelected(row))}>
            {checkbox && <td className={`${borderBottomClass(isLast(rows.length, index))} ${padding(size)}`}>
              <Checkbox checked={isSelected(row)} onChange={val => toggleRow(row, Boolean(val))} />
            </td>}
            {
              row.value.map((cell, cellIndex) =>
                <td key={cell?.text ?? cellIndex} className={`${borderBottomClass(isLast(rows.length, index))} ${padding(size)}`}>
                  {switchAction(cell)}
                </td>)
            }
            {
              Boolean(moreOptions && (moreOptions?.length ?? 0)) &&
              <td>
                <More id={row.id}
                  onSetCurrentOptionId={(id) => setCurrentOptionId(id)}
                  currentOptionId={currentMoreOptionId}
                  moreOptions={moreOptions}
                  onMoreClick={(clickAction) => moreClickAction(clickAction, row)} />
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
