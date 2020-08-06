import React from 'react';

const SelectList = ({
  id,
  name,
  checked,
  className,
  clickHandler,
  label,
  translation,
  ...rest
}) => (
  <li>
    <a>
      {/* <div
        role="button"
        tabIndex="-1"
        className="custom-checkbox"
        onClick={() => {
          clickHandler(name);
        }}
        onKeyDown={() => {
          clickHandler(name);
        }}
      >
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
      </div> */}
      list
    </a>
  </li>
);

export default SelectList;
