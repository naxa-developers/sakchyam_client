import React from 'react';

const CheckBox = ({
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
          type="checkbox"
          {...rest}
          name={name}
          checked={checked}
          onChange={changeHandler}
        />
        <label htmlFor="Initiative2">
          <span>{label}</span>
        </label>
      </div>
    </a>
  </li>
);

export default CheckBox;
