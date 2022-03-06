import { useState } from 'react';
import './TableBody.css';
import { borderBottomClass, getRowClass, padding } from '../commons';
import Checkbox from '../../Checkbox/Checkbox';
import Icon from '../../Icon/Icon';
import More from '../More/More';
import { DerivedDataSubType, DerivedDataType, MoreOptionsDataType, RowType, SizeType } from '@models/models';

const TableBody = ({ rows, isSelected, checkbox, size, moreOptions = [], 
  convertRowToData, toggleRow }: {rows: RowType[], checkbox: boolean, size: SizeType, moreOptions?: MoreOptionsDataType[], 
    toggleRow: (row: RowType, add: boolean) => void, isSelected: (row: RowType) => boolean,
  convertRowToData: (row: RowType) => DerivedDataType}) => {
  const DEFAULT_OPTION_ID = -5;
  const [currentMoreOptionId, setCurrentMoreOptionId] = useState(DEFAULT_OPTION_ID)

  const isLast = (arrayLength: number, index: number) => {
    return (arrayLength - 1) === index;
  }

  const setCurrentOptionId = (id: number) => {
    const newId = id === currentMoreOptionId ? DEFAULT_OPTION_ID : id;
    setCurrentMoreOptionId(newId)
  }

  const moreClickAction = (clickAction: (row: DerivedDataType) => void, row: RowType) => clickAction(convertRowToData(row))

  const switchAction = (cell: DerivedDataSubType) => {
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

export default TableBody;
