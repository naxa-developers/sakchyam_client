import React from 'react';

const FilterChip = ({ name, handleClick, chipState }) => {
  return (
    <a
      data-label={name}
      className={chipState.includes(name) ? 'active' : ''}
      role="tab"
      tabIndex="-1"
      onClick={() => {
        handleClick(name);
      }}
      onKeyUp={() => {
        handleClick(name);
      }}
    >
      <span>{name}</span>
    </a>
  );
};
export default FilterChip;
