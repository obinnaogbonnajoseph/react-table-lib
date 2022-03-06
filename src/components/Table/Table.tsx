import { useEffect, useReducer, useState } from 'react';
import './Table.css';
import TableHead from './TableHead/TableHead';
import TableBody from './TableBody/TableBody';
import TableFooter from './TableFooter/TableFooter';
import { DerivedDataSubType, DerivedDataType, HeaderType, MoreOptionsDataType, RowType, SizeType, SortHeadersType } from '@models/models';
import { removeRow } from './commons';

const Table = ({ caption, sortHeaders, size = 'default', checkbox = false, 
moreOptions, paginate = false, data, allSelectedRows = (rows: DerivedDataType[]) => console.log('*** selected rows ***', rows.length) }: 
{caption?: string, paginate?: boolean, sortHeaders?: SortHeadersType[], size?: SizeType, checkbox?: boolean, moreOptions?: MoreOptionsDataType[], data: DerivedDataType[], allSelectedRows?: (val: any[]) => void}) => {
  const [rows, setRows] = useState<RowType[]>([])
  const [rowsHash, setRowsHash] = useState<Map<number, Map<HeaderType, DerivedDataSubType>>>()
  const [selectedRows, setSelectedRows] = useState<DerivedDataType[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)

  const [headers, setHeaders] = useState<HeaderType[]>([])
  useEffect(() => {
    setHeaders((oldHeaders: HeaderType[]) => {
      if (!oldHeaders.length) {
        const sampleData = data[0];
        if (sampleData) return Object.keys(sampleData) as HeaderType[]
      }
      return oldHeaders
    })
  }, [data])

  const displayedEndIndexReducer = (state: any, { type, startIndex, endIndex, page, totalPages, paginatedDataLength }: 
    {type: 'endIndex' | 'startIndex', startIndex: number, endIndex: number, page: number, totalPages: number, paginatedDataLength: number}) => {
    switch (type) {
      case 'endIndex':
        const newEndIndex = page === totalPages ? (startIndex + (paginatedDataLength ?? 0)) : endIndex;
        return {
          ...state,
          displayedEndIndex: newEndIndex
        }
      default:
        throw new Error();
    }
  }

  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const [paginatedData, setPaginatedData] = useState<DerivedDataType[]>([])
  const [displayedStartIndex, setDisplayedStartIndex] = useState<number>(0)
  const [{ displayedEndIndex }, dispatch] = useReducer(displayedEndIndexReducer, { displayedEndIndex: 0 })
  useEffect(() => {
    const updateTotalPages = () => {
      setTotalPages(Math.ceil(data.length / selectedItemsPerPage))
    }

    const updatePagination = () => {
      if (paginate) {
        const startIndex = selectedItemsPerPage * (page - 1);
        const endIndex = selectedItemsPerPage * page;
        const newPaginatedData = data.slice(startIndex, endIndex);
        setPaginatedData(newPaginatedData)
        setDisplayedStartIndex(startIndex + 1)
        const newTotalPages = Math.ceil(data.length / selectedItemsPerPage);
        dispatch({ type: 'endIndex', startIndex, endIndex, page, totalPages: newTotalPages, paginatedDataLength: newPaginatedData.length })
      } else { setPaginatedData(data) }
    }

    updateTotalPages();
    updatePagination();
  }, [selectedItemsPerPage, data, page, paginate])


  useEffect(() => {
    setRows([]);
    const newRows = [];
    const newRowsHash = new Map<number, Map<HeaderType, DerivedDataSubType>>();
    for (let pageDataIndex = 0; pageDataIndex < paginatedData.length; pageDataIndex++) {
      const currentRow: {
        id: number;
        value: DerivedDataSubType[]
      } = {
        id: pageDataIndex,
        value: []
      }
      const datum = paginatedData[pageDataIndex];
      const rowHash = new Map<HeaderType, DerivedDataSubType>();
      for (let headerIndex = 0; headerIndex < headers.length; headerIndex++) {
        const header = headers[headerIndex];
        const currentCell = datum[header];
        currentRow.value.push(currentCell);
        rowHash.set(header, currentCell);
      }
      newRows.push(currentRow);
      newRowsHash.set(pageDataIndex, rowHash);
    }
    setRows(newRows);
    setRowsHash(newRowsHash);
  }, [paginatedData, headers])

  const itemsPerPage = [10, 20, 30, 40, 50];

  const convertRowToData = (row: RowType) => {
    const data = {} as unknown as DerivedDataType;
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      data[header] = row.value[i];
    }
    return data;
  }

  const isSelected = (row: RowType) => {
    const rowData = convertRowToData(row);
    const isSelectedVal = selectedRows.some(selectedRow => {
      const sameLength = Object.keys(selectedRow).length === Object.keys(rowData).length;
      if (sameLength) {
        const keys = Object.keys(selectedRow) as (keyof DerivedDataType)[];
        for (let key of keys) {
            const val = rowData[key];
            const subkeys = Object.keys(val) as (keyof DerivedDataSubType)[];
            for (let subkey of subkeys) {
                if (subkey !== 'template' && val[subkey] !== selectedRow[key][subkey]) return false;
            }
        }
        return true;
      }
      return false;
    })
    return isSelectedVal;
  }

  const changePage = (newPage: number) => {
    if (newPage < page && page > 1) setPage(newPage)
    if (newPage > page && page < totalPages) setPage(newPage)
  }

  const onSortColumn = (rows: RowType[]) => {
    setRows(rows);
  }

  const onSelectedItemChange = (val: number) => {
    setPage(1);
    setSelectedItemsPerPage(val)
  }

  const removeFromSelectedRows = (rows: DerivedDataType[], selectedRow: DerivedDataType) => {
    const newRows = removeRow(selectedRow, [...rows])
    allSelectedRows(newRows);
    return newRows;
  }

  const toggleRow = (row: RowType, add: boolean) => {
    const data = convertRowToData(row);
    setSelectedRows(val => {
      if (add) {
        allSelectedRows([...val, data])
        return [...val, data]
      }
      return removeFromSelectedRows(val, data)
    })
  }

  const toggleAll = (add: boolean) => {
    setSelectedRows(_val => {
      let newRows: DerivedDataType[] = [];
      if (add) newRows = [...paginatedData];
      allSelectedRows(newRows)
      return newRows
    })
  }

  return (<div className="flex flex-col w-full bg-neutral-100">
    <table>
      {caption && <caption className="text-h4 text-neutral-800 text-left">{caption}</caption>}
      <TableHead sortHeaders={sortHeaders}
        rows={rows}
        rowsHash={rowsHash}
        onSortColumn={rows => onSortColumn(rows)}
        size={size}
        headers={headers}
        checkbox={checkbox}
        checkboxVal={selectedRows.length === paginatedData.length}
        toggleAll={val => toggleAll(val)}
        moreOptionsLength={moreOptions?.length ?? 0} />
      <TableBody
        rows={rows}
        isSelected={(row) => isSelected(row)}
        checkbox={checkbox}
        size={size}
        toggleRow={(row, add) => toggleRow(row, add)}
        convertRowToData={row => convertRowToData(row)}
        moreOptions={moreOptions} />
    </table>
    {paginate && <TableFooter size={size}
      itemsPerPage={itemsPerPage}
      selectedItemsPerPage={selectedItemsPerPage}
      displayedStartIndex={displayedStartIndex}
      displayedEndIndex={displayedEndIndex}
      totalPages={totalPages}
      page={page}
      changePage={page => changePage(page)}
      onSelectedItemChange={val => onSelectedItemChange(val)} />}
  </div>)
};

export default Table;
