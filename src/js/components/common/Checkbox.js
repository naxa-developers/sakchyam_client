import React from 'react';

const CheckBox = ({
  id,
  name,
  checked,
  className,
  changeHandler,
  label,
  translation,
  ...rest
}) => (
  <li>
    <a>
      <div className="custom-checkbox">
        <input
          className={className}
          id={`${className}_${id}`}
          type="checkbox"
          data-label={label}
          {...rest}
          name={name}
          checked={checked}
          onChange={changeHandler}
        />
        <label htmlFor={`${className}_${id}`}>
          <span>{label}</span>
        </label>
      </div>
    </a>
  </li>
);

export default CheckBox;
