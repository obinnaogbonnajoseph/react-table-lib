import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TableBody.css';
import { borderBottomClass, getRowClass, padding } from '../commons';
import Control from '../../Control/Control';
import Icon from '../../Icon/Icon';
import More from '../More/More';

const TableBody = ({ rows, isSelected, checkbox, size, moreOptionsLength, convertRowToData }) => {
  const [currentMoreOptionId, setCurrentMoreOptionId] = useState(-5)

  const isLast = (arrayLength, index) => {
    return (arrayLength - 1) === index;
  }

  const setCurrentOptionId = (id) => setCurrentMoreOptionId(id)

  const moreClickAction = (clickAction, row) => clickAction(convertRowToData(row))

  return (
    <tbody>
      {
        rows.map((row, index) =>
          <tr key={row.id} className={getRowClass(isLast(row.length, index), isSelected(row))}>
            {checkbox && <td className={() => (`${borderBottomClass(isLast(row.length, index))} ${padding(size)}`)}>
              <Control />
            </td>}
            {
              row.value.map(cell =>
                <td className={() => (`${borderBottomClass(isLast(row.length, index))} ${padding(size)}`)}>
                  {() => {
                    switch (cell.type) {
                      case 'text':
                        return <div>
                          {cell.img && <img className="mr-8" alt={cell.text} src={cell.img} />}
                          {cell.icon && <Icon className="mr-8" name={cell.icon} />}
                          <span class="text-body1-regular text-neutral-700">{cell.text}</span>
                        </div>
                      case 'template':
                        return <>{cell.template}</>
                      default:
                        return <></>
                    }
                  }}
                </td>)
            }
            {
              moreOptionsLength &&
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
  size: PropTypes.oneOf(['default' | 'dense']),
  template: PropTypes.element,
  moreOptionsLength: PropTypes.number,
  convertRowToData: PropTypes.func
};

TableBody.defaultProps = {};

export default TableBody;
