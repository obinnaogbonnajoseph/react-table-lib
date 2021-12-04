import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

const Checkbox = ({ value, checked, disabled, error, name, onChange }) => {
  const [modValue, setModValue] = useState(value)
  const [modChecked, setModChecked] = useState(checked)

  const getCheckboxClass = () => {
    const baseClass = disabled ? 'base-checkbox-disabled' : error ? 'base-checkbox-error' : 'base-checkbox'
    return `m-0 flex justify-center items-center cursor-pointer ${baseClass}`
  }

  const updateChanged = e => {
    setModValue(!value ? e.target.checked : value)
    setModChecked(e.target.checked)
    onChange(e.target.checked ? value : '')
  }
  return (
    <div className="flex flex-col">
      <label className="flex cursor-pointer">
        <input name={name} id="checkbox-input"
          className={getCheckboxClass()}
          disabled={disabled}
          onChange={updateChanged}
          type="checkbox"
          value={modValue}
          checked={modChecked} />
      </label>
    </div>
  )
};

Checkbox.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func
};

Checkbox.defaultProps = {};

export default Checkbox;
