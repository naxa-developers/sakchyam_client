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
    <a
      className={checked ? 'active' : ''}
      onClick={() => {
        clickHandler(name);
      }}
      onKeyDown={() => {
        clickHandler(name);
      }}
      tabIndex="-1"
      role="button"
    >
      {name}
    </a>
  </li>
);

export default SelectList;
