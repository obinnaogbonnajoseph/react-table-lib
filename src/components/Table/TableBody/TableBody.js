import React from 'react';
import PropTypes from 'prop-types';
import './TableBody.css';
import { borderBottomClass, getRowClass, padding } from '../commons';
import Control from '../../Control/Control';
import Icon from '../../Icon/Icon';
import More from '../More/More.lazy';

const TableBody = (props) => {

  const isLast = (arrayLength, index) => {
    return (arrayLength - 1) === index;
  }

  return (
    <tbody>
      {
        props.rows.map((row, index) => <tr key={row.id} className={getRowClass(isLast(row.length, index), props.isSelected(row))}>
          {props.checkbox && <td className={() => (`${borderBottomClass(isLast(row.length, index))} ${padding(props.size)}`)}>
            <Control />
          </td>}
          {
            row.value.map(cell => <td className={() => (`${borderBottomClass(isLast(row.length, index))} ${padding(props.size)}`)}>
              {() => {
                switch (cell.type) {
                  case 'text':
                    return <div>
                      {cell.img && <img className="mr-8" alt={cell.text} src={cell.img} />}
                      {cell.icon && <Icon className="mr-8" name={cell.icon} />}
                      <span class="text-body1-regular text-neutral-700">{cell.text}</span>
                    </div>
                  case 'template':
                    return <>{props.template}</>
                  default:
                    return <></>
                }
              }}
            </td>)
          }
          {
            props.moreOptionsLength && <td>
              <More row={row} />
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
  template: PropTypes.element
};

TableBody.defaultProps = {};

export default TableBody;
