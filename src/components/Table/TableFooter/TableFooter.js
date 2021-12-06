import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TableFooter.css';
import { padding } from '../commons';
import Icon from '../../Icon/Icon';

const TableFooter = ({ size, itemsPerPage, selectedItemsPerPage, displayedStartIndex, displayedEndIndex, totalPages, page, changePage, onSelectedItemChange }) => {
  const [selectValue, setSelectedValue] = useState(selectedItemsPerPage);

  const cursor = (condition) => condition ? 'cursor-not-allowed' : 'cursor-pointer'

  const onSelectChange = e => {
    setSelectedValue(e.target.value);
    onSelectedItemChange(e.target.value)
  }

  const pageLessClass = () => page === 1 ? 'md-inactive' : ''

  const pageMoreClass = () => page === totalPages ? 'md-inactive' : ''

  return (
    <div className={`${padding(size)} flex items-center`}>
      <span className="text-body1-regular text-neutral-600">Rows per page:</span>
      <select onChange={onSelectChange} value={selectValue} className="mr-16">
        {itemsPerPage.map(item =>
          <option key={item}>{item}</option>)}
      </select>
      <span className="text-neutral-700 mr-14">{`${displayedStartIndex}-${displayedEndIndex} of ${totalPages}`}</span>
      <span onClick={() => changePage(page - 1)} className={`${cursor(page === 1)} mr-12`}>
        <Icon iconName="chevron_left" className={`material-icons ${pageLessClass()}`} />
      </span>
      <span onClick={() => changePage(page + 1)} className={`${cursor(page === totalPages)}`}>
        <Icon iconName="chevron_right" className={`material-icons ${pageMoreClass()}`} />
      </span>
    </div>
  )
};

TableFooter.propTypes = {
  size: PropTypes.oneOf(['default', 'dense']),
  itemsPerPage: PropTypes.arrayOf(PropTypes.number),
  selectedItemsPerPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  displayedStartIndex: PropTypes.number,
  displayedEndIndex: PropTypes.number,
  totalPages: PropTypes.number,
  page: PropTypes.number,
  changePage: PropTypes.func,
  onSelectedItemChange: PropTypes.func
};

TableFooter.defaultProps = {};

export default TableFooter;
