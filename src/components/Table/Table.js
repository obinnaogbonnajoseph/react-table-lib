import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import './Table.css';
import { TableHead } from './TableHead/TableHead';
import { TableBody } from './TableBody/TableBody';
import { TableFooter } from './TableFooter/TableFooter';


const Table = ({ caption, sortHeaders, size, checkbox, moreOptions, paginate, data }) => {
  const [rows, setRows] = useState([])
  const [rowsHash, setRowsHash] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [totalPages, setTotalPages] = useState(1)

  const [headers, setHeaders] = useState([])
  useEffect(() => {
    setHeaders(oldHeaders => {
      if (!oldHeaders.length) {
        const sampleData = data[0];
        if (sampleData) return Object.keys(sampleData)
      }
      return oldHeaders
    })
  }, [data])

  const displayedEndIndexReducer = (state, action) => {
    switch (action.type) {
      case 'endIndex':
        return {
          ...state,
          displayedEndIndex: state.page === state.totalPages ? (action.startIndex + state.paginatedData.length) : action.endIndex
        }
      default:
        throw new Error();
    }
  }

  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [paginatedData, setPaginatedData] = useState([])
  const [displayedStartIndex, setDisplayedStartIndex] = useState(0)
  const [{ displayedEndIndex }, dispatch] = useReducer(displayedEndIndexReducer, { displayedEndIndex: 0 })
  useEffect(() => {
    const updateTotalPages = () => {
      setTotalPages(Math.ceil(data.length / selectedItemsPerPage))
    }

    const updatePagination = () => {
      if (paginate) {
        const startIndex = selectedItemsPerPage * (page - 1);
        const endIndex = selectedItemsPerPage * page;
        setPaginatedData(data.slice(startIndex, endIndex))
        setDisplayedStartIndex(startIndex + 1)
        dispatch({ type: 'endIndex', startIndex, endIndex })
      } else { setPaginatedData(data) }
    }

    updateTotalPages();
    updatePagination();
  }, [selectedItemsPerPage, data, page, paginate])


  useEffect(() => {
    setRows([]);
    const newRows = [];
    const newRowsHash = new Map();
    for (let pageDataIndex = 0; pageDataIndex < paginatedData.length; pageDataIndex++) {
      const currentRow = {
        id: pageDataIndex,
        value: []
      }
      const datum = paginatedData[pageDataIndex];
      const rowHash = new Map();
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

  const convertRowToData = (row) => {
    const data = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      data[header] = row.value[i];
    }
    return data;
  }

  const isSelected = (row) => {
    const data = convertRowToData(row);
    const isSelected = selectedRows.some(datum => {
      const sameLength = Object.keys(datum).length === Object.keys(data).length;
      if (sameLength) {
        const keys = Object.keys(datum);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (key !== 'template' && datum[key] !== data[key]) return false
        }
        return true
      }
      return false;
    })
    return isSelected;
  }

  const changePage = (newPage) => {
    if (newPage < page && page > 1) setPage(newPage)
    if (newPage > this.page && this.page < this.totalPages) setPage(newPage)
    setPaginatedData();
  }

  const onSortColumn = rows => {
    setRows(rows);
  }

  const onSelectedItemChange = val => {
    setPage(1);
    setSelectedItemsPerPage(val)
  }

  return (<div className="flex flex-col w-max bg-neutral-100">
    <table>
      <caption className="text-h4 text-neutral-800 text-left">{caption}</caption>
      <TableHead sortHeaders={sortHeaders}
        rows={rows}
        rowsHash={rowsHash}
        onSortColumn={rows => onSortColumn(rows)}
        size={size}
        headers={headers}
        checkbox={checkbox}
        moreOptionsLength={moreOptions.length} />
      <TableBody
        rows={rows}
        isSelected={(row) => isSelected(row)}
        checkbox={checkbox}
        size={size}
        convertRowToData={row => convertRowToData(row)}
        moreOptionsLength={moreOptions?.length ?? 0} />
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

Table.propTypes = {
  caption: PropTypes.string,
  paginate: PropTypes.bool,
  sortHeaders: PropTypes.arrayOf(PropTypes.string),
  size: PropTypes.oneOf(['default', 'dense']),
  checkbox: PropTypes.bool,
  moreOptions: PropTypes.arrayOf(PropTypes.exact({
    text: PropTypes.string,
    icon: PropTypes.string,
    action: PropTypes.func
  })),
  data: PropTypes.object.isRequired
};

Table.defaultProps = {
  size: 'default',
  paginate: false,
  checkbox: false
};

export default Table;
