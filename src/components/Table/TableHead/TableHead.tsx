import './TableHead.css';
import { getRowClass, padding, borderBottomClass, titleCase } from '../commons';
import Checkbox from '../../Checkbox/Checkbox'
import Icon from '../../Icon/Icon';
import { DerivedDataSubType, HeaderType, RowType, SizeType, SortHeadersType } from '@models/models';

const TableHead = ({ sortHeaders = [], rows, rowsHash = new Map<number, Map<HeaderType, DerivedDataSubType>>(), size, 
  onSortColumn, moreOptionsLength, headers, 
  checkbox, checkboxVal, toggleAll }: {sortHeaders?: SortHeadersType[], rows: RowType[], size: SizeType, 
    headers: HeaderType[], checkbox: boolean, checkboxVal:boolean, toggleAll: (val: boolean) => void, 
    moreOptionsLength: number, rowsHash?: Map<number, Map<HeaderType, DerivedDataSubType>>, onSortColumn: (rows: RowType[]) => void}) => {

  const canSort = (header: HeaderType) => {
    return sortHeaders.some(val => val.value === header);
  }

  const sortColumn = (header: HeaderType) => {
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

  const getIconName = (header: HeaderType) => {
    const sort = sortHeaders.find(val => val.value === header)?.sort;
    return sort === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }

  return (
    <thead className={getRowClass(false, false, size)}>
      <tr>
        {checkbox &&
          <th className={`${padding(size)} text-center ${borderBottomClass(false)}`}>
            <Checkbox checked={checkboxVal} onChange={val => toggleAll(Boolean(val))} />
          </th>}
        {headers.map(header => (
          <th key={header} className={`${borderBottomClass(false)} ${padding(size)} text-center`}>
            <div onClick={() => sortColumn(header)} className={canSort(header) ? 'cursor-pointer' : ''}>
              <span className="text-subtitle2 text-neutral-700">{titleCase(header)}</span>
              {canSort(header) && <Icon iconName={getIconName(header)} className="material-icons ml-8" />}
            </div>
          </th>
        ))}
        {Boolean(moreOptionsLength) && <th className={borderBottomClass(false)}></th>}
      </tr>

    </thead>)
};

export default TableHead;
