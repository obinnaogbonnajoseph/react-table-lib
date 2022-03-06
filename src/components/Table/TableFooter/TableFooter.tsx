import React, { useState } from 'react';
import './TableFooter.css';
import { padding } from '../commons';
import Icon from '../../Icon/Icon';
import { SizeType } from '@models/models';

const TableFooter = ({ size, itemsPerPage, selectedItemsPerPage, 
  displayedStartIndex, displayedEndIndex, totalPages, page, 
  changePage, onSelectedItemChange }: { size: SizeType, itemsPerPage: number[], 
  selectedItemsPerPage: number, displayedStartIndex: number, displayedEndIndex: number, 
  totalPages: number, page: number, changePage: (page: number) => void, 
  onSelectedItemChange: (val: number) => void}) => {
  const [selectValue, setSelectedValue] = useState<number>(selectedItemsPerPage);

  const cursor = (condition: boolean) => condition ? 'cursor-not-allowed' : 'cursor-pointer'

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(e.target.value) {
      const selectedValue = Number(e.target.value);
      setSelectedValue(selectValue);
      onSelectedItemChange(selectedValue)
    }
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

export default TableFooter;
