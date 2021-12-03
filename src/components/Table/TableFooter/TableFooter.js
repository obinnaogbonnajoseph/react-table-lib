import React from 'react';
import PropTypes from 'prop-types';
import './TableFooter.css';
import { padding } from '../commons';
import Icon from '../../Icon/Icon';

const TableFooter = ({ size, itemsPerPage, selectedItemsPerPage, displayedStartIndex, displayedEndIndex, totalPages, page, changePage }) => {

  const cursor = (condition) => condition ? 'cursor-not-allowed' : 'cursor-pointer'

  return (
    <div className={() => (`${padding(size)} flex`)}>
      <span className="text-body1-regular text-neutral-600">Rows per page:</span>
      <select className="mr-16">
        {itemsPerPage.map(item =>
          <option selected={item === selectedItemsPerPage}>{item}</option>)}
      </select>
      <span className="text-neutral-700 mr-14">{() => `${displayedStartIndex}-${displayedEndIndex} of ${totalPages}`}</span>
      <span onClick={() => changePage(page - 1)} className={() => `${cursor(page === 1)} mr-12`}>
        <Icon />
      </span>
      <span onClick={() => changePage(page + 1)} className={() => `${cursor(page === totalPages)}`}>
        <Icon />
      </span>
    </div>
  )
};

TableFooter.propTypes = {
  size: PropTypes.number,
  itemsPerPage: PropTypes.arrayOf(PropTypes.number),
  selectedItemsPerPage: PropTypes.number,
  displayedStartIndex: PropTypes.number,
  displayedEndIndex: PropTypes.number,
  totalPages: PropTypes.number,
  page: PropTypes.number,
  changePage: PropTypes.func
};

TableFooter.defaultProps = {};

export default TableFooter;
