import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

const Checkbox = ({ checked, disabled, error, name, onChange }) => {
  const [modChecked, setModChecked] = useState(checked)
  useEffect(() => {
    setModChecked(checked)
  }, [checked])

  const getCheckboxClass = () => {
    const baseClass = disabled ? 'base-checkbox-disabled' : error ? 'base-checkbox-error' : 'base-checkbox'
    return `m-0 flex justify-center items-center cursor-pointer ${baseClass}`
  }

  const updateChanged = e => {
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
