import React, { useEffect, useState } from 'react';
import './Checkbox.css';

const Checkbox = ({ checked, disabled, error, name, onChange }
  : {checked: boolean, disabled?: boolean, error?: boolean, name?: string, onChange: (val: boolean) => void}) => {
  const [modChecked, setModChecked] = useState<boolean>(checked)
  useEffect(() => {
    setModChecked(checked)
  }, [checked])

  const getCheckboxClass = () => {
    const baseClass = disabled ? 'base-checkbox-disabled' : error ? 'base-checkbox-error' : 'base-checkbox'
    return `m-0 flex justify-center items-center cursor-pointer ${baseClass}`
  }

  const updateChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModChecked(e.target.checked)
    onChange(e.target.checked)
  }
  return (
    <div className="flex flex-col">
      <label className="flex cursor-pointer">
        <input name={name} id="checkbox-input"
          className={getCheckboxClass()}
          disabled={disabled}
          onChange={updateChanged}
          type="checkbox"
          checked={modChecked} />
      </label>
    </div>
  )
};

export default Checkbox;
